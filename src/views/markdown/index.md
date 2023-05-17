# 写在前面

如果 a 仅仅是一个常量，在同一种语言中，显然题目是不会成立的，环境限制为 JS,因此就要利用 JS 语言的特点，使得上述结果为 true，在 JS 中，当涉及到加运算或==判断时，会触发`隐式转换`规则，转换的目的是将两个值转换为相同的数据类型，具体的转换规则如下：

- 两个引用类型比较，只需判断它们是不是引用了同一个对象，是返回 true，否则为 false。

- undefined 和 null 两者互相比较或者与自身比较，结果是 true。它俩与其他任何值比较的都为 false。

- NaN 与任何值比较包括它自身结果都是 false。

- 引用类型和基本数据类型进行比较，两者最后都会转换成基本数据类型再进行比较。

- String，Boolean，Number 中的任意两个进行比较，最后都会转为 Number 类型再进行比较。

# 方法一

```js
const a = {
  value: 1,
  valueOf: function(){
    return a.value++
  }
}

if (a == 1 && a == 2 && a == 3){
  console.log(true)
}
```

## 原理分析

a 是一个对象，JS 中，当复杂类型和数字做比较时，会先调用复杂类型的`valueOf`方法，获取类型的原始值，如果得到的是一个 string 类型则直接返回原始值，如果得到的不是一个 string 类型，则继续调用`toString`方法，得到 string 类型之后返回。上述方法，每次获取 a 的值，都重写它的`valueOf`方法，从而返回我们想要的值。

# 方法二

```js
const a = {
  value: 1,
  toString: function(){
    return a.value++
  }
}

if (a == 1 && a == 2 && a == 3){
  console.log(true)
}
```

## 原理分析

原理同方法一，只不过，方法一是在 a 对象调用`valueOf`方法时劫持，而此方法原理是：转换类型时，发现 a 是一个复杂类型，调用`valueOf`方法，返回时 object 类，不是一个基本类型，再调用`toString`方法，这个时候，我们劫持了`toString`方法，在`toString`方法中写我们的逻辑。

# 方法三

```js
let value = 1;
Object.defineProperty(window,'a',{
    get:function(){
        return value++;
    }
})

if (a == 1 && a == 2 && a == 3){
  console.log(true)
}
```

## 原理分析

全局变量也相当于`window`上定义的一个属性，这里用`defineProperty `定义了`a`和`getter`也使其动态返回值，属性的 getter 函数，当访问该属性时，会调用此函数。执行时不传入任何参数，该函数的返回值会被用作属性的值。

# 方法四

```js
const obj = {
  value: 1
}
const a = new Proxy(obj, {
  get(target, key) { return () => target.value++ }
});

if (a == 1 && a == 2 && a == 3) {
  console.log(true);
}
```

## 原理分析

这里使用`ES6`新增的代理`Proxy`，在读取对象属性时重写对象的`getter`方法，当访问该属性时，会调用此函数，就可以得到想要的结果。
