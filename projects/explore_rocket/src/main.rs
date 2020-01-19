#![feature(proc_macro_hygiene, decl_macro)]

use rand;

#[macro_use]
extern crate rocket;
extern crate postgres;
extern crate dotenv;

use postgres::{Client, NoTls, Error};
use rocket::http::*;

use dotenv::dotenv;
use std::env;


include!("config.rs");


fn main() {
  dotenv().ok();
  let is_in_production = dotenv::var("PRODUCTION")
    .ok()
    .expect("0")
    .eq("1");

//  let is_in_production = dotenv::var("PRODUCTION");

  println!("is_in_production => {:?}",is_in_production)

//  for (key, value) in env::vars() {
//    println!("{}: {}", key, value);
//  }

//  let is_in_production = env::var("PRODUCTION").is_ok();
//  let is_in_staging = env::var("STAGING").is_ok();

//  rocket::ignite().mount("/", routes![index, world, hello,helloName])
//    .attach(postgres::Connection::fairing())
//    .launch();

//  if is_in_production {
//    println!("Our app is running in production…")
//  }
//  else if is_in_staging {
//    println!("Our app is running in staging…")
//  } else {
//    println!("Our app isn't running in production or staging…")
//  }
}
