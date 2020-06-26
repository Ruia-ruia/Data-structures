/*
Units:
  - Instruction Set (HLT, PSH const, POP, SET reg const)
  - Stack
  - Instruction Pointer
  - Registers

Functions:
  - Parse code text
  - Break into instructions and operands
  - Interpret instructions and carry them out (update SP, PC, and other counters)
*/

#include <stdio.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define OPER_LEN 2
#define INSTR_LEN 3

//global declarations
int stack[256];
int pc = 0;
signed int sp = -1;

enum instructions { PSH, POP, HLT, SET };

typedef struct Registers regs;
struct Registers {
  int A;
  int B;
  int C;
};


int interp(char *instr, char *oper)
{
  int in;
  if (strcmp(instr, "PSH") == 0) in = PSH;
  if (strcmp(instr, "POP") == 0) in = POP;
  if (strcmp(instr, "HLT") == 0) in = HLT;

  switch (in) {
    case PSH:
      sp += 1;
      stack[sp] = atoi(&oper[0]);
      break;

    case POP:
      sp -= 1;
      break;

    case HLT:
      //end of process life
      return -1;
  }

  //update program counter
  return pc + 1;
}


int engine(char **instructions, int len)
{
  if (len <= 0) return -1;

  signed int out;
  char *instr;
  char *oper;

  out = 0;
  instr = (char *) malloc(sizeof(char) * INSTR_LEN);
  oper = (char *) malloc(sizeof(char) * OPER_LEN);

  //Potentially infinite tape
  while (pc != -1) {
    int i = pc;

    for (int j = 0; j < strlen(instructions[i]); j++){
      if (instructions[i][j] != ' ') {
        instr[j] = instructions[i][j];

      } else {
        oper[i] = instructions[i][j + 1];
      }
    }

    pc = interp(instr, &oper[i]);
  }

  printf("%d\n", stack[sp]);
  free(instr);

  return 0;
}


int main()
{
  char *program = "PSH 3;PSH 4;PSH 2;PSH 1;POP;HLT;";
  char *code[15];

  //allocate chunks for each instruction line
  for (int i = 0; i < 10; i++) {
        code[i] = (char *) malloc(10);
  }

  //store each instruction line in its own chunk
  int j = 0;
  int b = 0;
  for (int i = 0; i < strlen(program); i++){
    if (program[i] == ';') {
      j += 1;
      b = 0;

    } else {
      code[j][b] = program[i];
      b += 1;
    }
  }

  //call the engine to begin execution
  int result = engine(code, j);

  //free earlier allocated chunks
  for (int i = 0; i < 10; i++) {
        free(code[i]);
  }

  return 0;
}
