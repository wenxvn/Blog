---
title: "牛客周赛 Round 143"
date: "2026-05-11"
tags: ["牛客"]
category: "比赛记录"
problemUrl: "https://ac.nowcoder.com/acm/contest/134529"
---

# 总结

只做出来AB，B题因为哈希表爆内存，卡了很久

C题应该是数论，不太熟

# 小红的区间构造

## 思路

直接构造[1,x]，记得开long long

## 代码
```c++
#include<bits/stdc++.h>
using namespace std;
#define int long long
signed main(){
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int x;cin>>x;
	cout<<1<<" "<<x;
	return 0;
}
```

# 小红的冷门副本

## 思路

用unordered_map<int,int>map记录出现的次数

注意：直接从1到m遍历哈希表会爆内存

因为遍历时会把哈希表中未出现的数据存进去

例如判断map[t]<=x，如果哈希表中本身没有存t，但是在判断时会直接把[t,0]存进去，这样会极大地增加内存负担

## 代码
```c++
#include<bits/stdc++.h>
using namespace std;
int n,m,x,ans;
int main(){
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>x;
	unordered_map<int,int>map;
	int t;
	for(int i=0;i<n;i++){
		cin>>t;
		map[t]++;
	}
	for(auto &t:map){
		if(t.second<=x)ans++;
	}
	ans+=m-map.size();
	cout<<ans;
	return 0;
}
```

# 小红的因子幂和

## 思路
质因数分解+枚举因数+快速幂

质因数分解和快速幂背出模板即可

如何找出v的全部因子？

只要找出x和y的全部因子，将因子互相相乘

## 代码
```c++
#include<bits/stdc++.h>
using namespace std;
#define int long long
const int MOD=1000000007;
unordered_map<int,int>mp;
//分解质因数 
void fac(int n){
	for(int i=2;i*i<=n;i++){
		while(n%i==0){
			mp[i]++;
			n/=i;
		}
	}
	if(n>1)mp[n]++;
}
//快速幂 
int qpow(int a,int b){
	a%=MOD;
	int res=1;
	while(b){
		if(b%2)res=res*a%MOD;
		a=a*a%MOD;
		b>>=1;
	}
	return res;
}
signed main(){
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int x,y;cin>>x>>y;
	fac(x);fac(y);
	//枚举因数 
	vector<int>num;
	num.push_back(1);
	for(auto &t:mp){
		int len=num.size();
		int cur=1;
		for(int i=0;i<t.second;i++){
			cur*=t.first;
			for(int j=0;j<len;j++){
				num.push_back(cur*num[j]);
			}
		}
	}
	int ans=0;
	for(int k:num){
		ans=(ans+qpow(k,k)%MOD)%MOD;
	}
	cout<<ans;
	return 0;
}
```
