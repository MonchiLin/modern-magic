#![feature(proc_macro_hygiene, decl_macro)]

use rand;
use core::panicking::panic;

#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
  "Hello, world!"
}

#[get("/word")]
fn word() -> &'static str {
  panic;
  "1"
}

fn main() {
  rocket::ignite().mount("/", routes![index, word])
    .launch();
}
