pub fn run() {
    let s = "Hello";
    let mut s1 = String::from("Hello");
    let s2 = s;

    s1.push_str(", World!");

    println!("s => {}, s1 => {}, s2 => {}", s, s1, s2);

    let t1 = String::from("Hello");
    let t2 = t1;

    println!("t2 => {}", t2);

    let x = 5;
    let mut y = x;

    y = 10;

    println!("x => {}, y => {}", x, y)
}
