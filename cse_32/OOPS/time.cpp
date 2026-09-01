#include <iostream>
using namespace std;

class Time {
    int h, m;
    public:
    void set(int a, int b) {
        h = a;
        m = b;
    }
    void sum(Time t1, Time t2) {
        m = t1.m + t2.m;
        h = m / 60;
        m = m % 60;

        h += t1.h + t2.h;
    }
    void show() {
        cout << "Time = " << h << "hr" << m << " min" << endl;
    }};
int main() {
    Time a, b, c;

    a.set(2, 45);
    b.set(3, 30);

    c.sum(a, b);
    c.show();

    return 0;
}