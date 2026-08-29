#include <iostream>
using namespace std;

int qu[50];
int front =-1, rear = -1;

void insert(int item)
{
 if ((front==0&&rear==49)||(front==rear+1))
 {
        cout << "Queue Overflow\n";
        return;
 }
    if (rear==49)
        rear=0;
    else if (front==-1&&rear==-1)
        front = rear = 0;
    else
        rear++;

    qu[rear] = item;
}

void del()
{
    if (front == -1)
    {
        cout << "Queue Underflow\n";
        return;
    }
    int x = qu[front];
    cout << "Deleted = " << x << endl;
    if (front == rear)
        front = rear = -1;
    else if (front == 49)
        front = 0;
    else
        front++;
}

void display()
{
    if (front==-1)
    {
        cout << "Queue is Empty\n";
        return;
    }
    int i=front;
    while (true)
    {
        cout<<qu[i]<<" ";
        if(i==rear)
            break;
        i=(i+1)%50;
    }
    cout << endl;
}

int main()
{
    cout<<"queue = ";
    insert(10);
    insert(20);
    insert(30);

    display();

    del();
    del();
    del();
    insert(40);
    insert(60);
    del();
    del();
    del();


    display();

    return 0;
}