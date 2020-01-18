pub fn run() {
  fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
      if item == b' ' {
        println!("这个居然是空格，把它(索引 => {})返回出去 => {}", i, item);
        return &s[0..i];
      }
    }

    println!("我的 s 长度不可能是 => {}, s => {}", s.len(), s);
    &s[..]
  }

  let res = first_word("Hello World");
  println!("res => {}", res);
}

pub fn test_string_slice_ownership() {
  let origin = String::from("Hello");

  let he = &origin[0..2];
  let llo = &origin[2..];

  println!("he => {}, llo => {}, origin => {}", he, llo, origin)
}
