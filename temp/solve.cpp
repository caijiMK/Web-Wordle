// Think twice, code once.
#include <cstdio>
#include <string>
#include <cstring>
#include <iostream>
#include <algorithm>
using namespace std;

string s;

int main() {
	freopen("dictionary.txt", "r", stdin);
	freopen("newDictionary.txt", "w", stdout);
	while (cin >> s)
		if (s.length() == 5) {
			for (char &c : s) c += 'A' - 'a';
			cout << "\t\"" << s << "\"," << '\n';
		}
	return 0;
}