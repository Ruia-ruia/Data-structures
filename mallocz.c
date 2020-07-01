/*
~~ Work in progress ~~
Units:
- Chunk struct
- Chunk linked list
*/

#include <assert.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

#define SBRK_FAIL -1

/* UNITS (TYPES, PROTOTYPES) */

typedef struct meta_chunk* chunkptr;

typedef struct meta_chunk {
    chunkptr next;
    unsigned int free;
    unsigned int size;
} chunk;

/* GLOBALS */

//init the free list at NULL
chunkptr head = NULL;
chunkptr base = NULL;

/* HELPERS */

int aligned(int x) {
    int power;

    power = 1;
    x += 1;

    while (power < x) {
      power *= 2;
    }

    return power;
}

void *get_free(size_t size) {
    chunkptr cursor;
    chunkptr save_ptr;
    
    if (base == NULL) return NULL;

    if (base->size == size) {
        save_ptr = base; 
        base = base->next; 
        save_ptr->next = NULL; 
        return save_ptr;
    } 

    cursor = base;
    save_ptr = base;

    while (cursor) {
        
        if (cursor->size == size) {
            save_ptr->next = cursor->next;
            cursor->next = NULL;
            return cursor;
        }

        save_ptr = cursor;
        cursor = cursor->next;
    }

    
    return NULL;
}

/* API */

int freez(void *user_ptr) {
    chunkptr cp = user_ptr - sizeof(chunk);
    cp->free = 1;

    //only once to save the base for searches
    if (base == NULL) base = cp;

    if (head == NULL) {
        head = cp;
    } else {
        head->next = cp;
        head = cp;
    }

    printf("%p is head\n-------\n", head);
    return 0;
}

void *mallocz(size_t size) {
    void* p;
    void* ret;
    void* user_ptr;
    void* freed_ptr;
    int aligned_size;
    int meta_size;
    chunk meta;

    if (size < 0) return NULL;
    aligned_size = aligned(size);
    
    freed_ptr = get_free(aligned_size);
    
    if (freed_ptr) {
        printf("Found a chunk in the freelist.\n");
        user_ptr = freed_ptr + meta_size;
        return user_ptr;
    }

    printf("Did not find chunk in the freelist.\n");

    meta.next = NULL;
    meta.free = 0;
    meta.size = aligned_size;
    meta_size = sizeof(meta);

    p = sbrk(0);
    if (p == SBRK_FAIL) {
        user_ptr = NULL;

    } else {
        ret = sbrk(meta_size + aligned_size);
        assert(p == ret);

        memcpy(ret, &meta, meta_size);
        user_ptr = ret + meta_size;
    }

    return user_ptr;
}

int main(void) {

/* testing */

    char* a = mallocz(20);
    char* b = mallocz(10);
    char* c = mallocz(10);
    freez(a);
    freez(b);
    freez(c);

    
    char* d = mallocz(10);
    char* e = mallocz(10);
    char* f = mallocz(20);

    /*
    freez(d);
    freez(e);
    freez(f);
    
    char* g = mallocz(10);
    char* h = mallocz(10);
    char* i = mallocz(10);
    */

    printf("%p was a\n", a);
    printf("%p was b\n", b);
    printf("%p was c\n", c);

    
    printf("%p was d\n", d);
    printf("%p was e\n", e);
    printf("%p was f\n", f);


    return 0;
}
