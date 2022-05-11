trait Account {
  def no: String
}

case class CheckingAccount(
                            no: String
                          ) extends Account

case class SavingAccount(
                          no: String,
                          rateOfInterest: BigDecimal
                        ) extends Account

object Account {
  def apply(): Unit = {

  }
}

trait AccountService {
  def transfer(from: Account, to: Account, amount: Double): Option[Account]
}

val a1 = SavingAccount("1", 1)

val a2 = a1.copy(rateOfInterest = 10)
