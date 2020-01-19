
pub struct Post {
  pub id: i32,
  pub title: String,
  pub body: String,
  pub published: bool,
}


pub struct NewPost<'a> {
  pub title: &'a str,
  pub body: &'a str,
}
