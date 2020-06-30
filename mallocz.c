/*
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

typedef struct Meta_Chunk* chunkptr;
typedef struct Meta_Chunk chunk;

struct Meta_Chunk {
    chunkptr next;
    unsigned int free;
    unsigned int size;
};

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
    chunkptr user_ptr;

    if (base == NULL) return NULL;
    if (base->size == size) cursor = base; base = base->next; return cursor;

    cursor = base;
    while (cursor->next) {
        printf("searching freelist\n");

        if (cursor->next->size == size) {
            user_ptr = cursor->next;
            cursor = user_ptr->next;
            return user_ptr;
        }

        cursor = cursor->next;
    }

    //no free chunk / in free list / is appropriate size
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
        chunkptr tmp = cp;
        head->next = cp;
        head = tmp;
    }

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
    if (size == 0) size = 8;

    aligned_size = aligned(size);
    freed_ptr = get_free(aligned_size);

    if (freed_ptr) {
        printf("Found a chunk in the freelist.\n");
        user_ptr = freed_ptr + meta_size;
        return user_ptr;
    }

    printf("Did not find chunk in the freelist.\n");

    meta_size = sizeof(meta);
    meta.next = NULL;
    meta.free = 0;
    meta.size = aligned_size;

    p = sbrk(0);
    if (p != SBRK_FAIL) {

        ret = sbrk(meta_size + aligned_size);
        assert(p == ret);

        memcpy(ret, &meta, meta_size);
        user_ptr = ret + meta_size;
    }

    return user_ptr;
}

int main() {

/* testing */

    char* a = mallocz(10);
    char* b = mallocz(10);
    char* c = mallocz(10);
    freez(a);
    freez(b);
    freez(c);
    char* d = mallocz(10);
    char* e = mallocz(10);
    char* f = mallocz(10);
    freez(d);
    freez(e);
    freez(f);


    return 0;
}
