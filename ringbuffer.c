/*
This is an implementation of a ring buffer data structure also known as a Circular Queue 
By Ka^Io 
*/

#include <stdio.h>
#include <stdlib.h>

struct ringbuf {
    uint8_t buf[10];
    int head;
    int tail;
    int maxlen;
};

int main()
{
    setbuf(stdout, NULL);
    struct ringbuf RB;

    RB.head = 0;
    RB.tail = 0;
    RB.maxlen = 10 - 1;
    int full = 0;
    int empty = 0;

    while (1)
    {
      char in;
      printf("Enter 'w' for write and 'r' for read: \n");

      scanf(" %c", &in);

      if (in == 'w'){
            //WRITE
            int c;
            printf("Enter a new int to store:\n");
            scanf("%d", &c);

            if(full != 1){
              RB.buf[RB.head] =  c;
              RB.head += 1;

              if (RB.head == RB.maxlen){
                RB.head = 0;                 //wrap around
              }

              if (RB.head == RB.tail){
                full = 1;
              }

            } else {
              printf("New element cannot be inserted\n");
            }
      }

      else if (in == 'r'){
            //READ
            int temp = 0;
            if((RB.head == RB.tail) && full != 1){
              temp = 1;
            }

            int empty = temp;

            if(empty != 1){
              printf("read: %d\n", RB.buf[RB.tail]);
              RB.tail += 1;
              full = 0;

              if (RB.tail == RB.maxlen){
                RB.tail = 0;                //wrap around
              }

            } else {
              printf("Buffer is empty.\n");
            }
      }
      else {
        continue;
      }
    }

    return 0;
}
