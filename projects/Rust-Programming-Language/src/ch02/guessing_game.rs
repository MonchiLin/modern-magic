use std::io;
use std::cmp::Ordering;
use rand::Rng;

pub fn run() {
  println!("来玩猜数字!");
  let secret_number = rand::thread_rng().gen_range(1, 101);
  println!("期望值为: {}", secret_number);

  loop {
    println!("请输入你的猜测");

    let mut guess = String::new();

    io::stdin()
      .read_line(&mut guess)
      .expect("读取输入失败");

    let guess_int: u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => continue
    };

    match guess_int.cmp(&secret_number) {
      Ordering::Less => println!("太小"),
      Ordering::Greater => println!("太大"),
      Ordering::Equal => {
        println!("你赢了");
        break;
      }
    }
  }
}

