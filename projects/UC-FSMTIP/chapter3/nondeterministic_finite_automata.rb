require 'set'
require './deterministic_finite_automata'

class NFARuleBook < Struct.new(:rules)

  # 返回所有的下一个状态
  def next_states(states, character)
    states.flat_map { |state| follow_rules_for(state, character) }.to_set
  end

  # 调用每个规则的 follow (返回转移到的下一个状态)
  # .map 将所有的下一个状态存在数组中
  def follow_rules_for(state, character)
    rules_for(state, character)
        .map(&:follow)
  end

  # 返回所有可以应用的规则
  def rules_for(state, character)
    # select 返回满足的条件的元素, 类似 filter
    rules.select { |rule| rule.applies_to?(state, character) }
  end

end

class NFA < Struct.new(:current_states, :accept_states, :rulebook)

  def accepting?
    (current_states & accept_states).any?
  end

  def read_character(character)
    self.current_states = rulebook.next_states(current_states, character)
  end

  def read_string(string)
    string.chars.each do |character|
      read_character(character)
    end
  end

end

class NFADesign < Struct.new(:start_state, :accept_states, :rulebook)
  def accepts?(string)
    to_nfa.tap { |nfa| nfa.read_string(string) }.accepting?
  end

  def to_nfa
    NFA.new(Set[start_state], accept_states, rulebook)
  end

end

ruleBook = NFARuleBook.new(
    [
        FARule.new(1, 'a', 1), FARule.new(1, 'b', 1), FARule.new(1, 'b', 2),
        FARule.new(2, 'a', 3), FARule.new(2, 'b', 3),
        FARule.new(3, 'a', 4), FARule.new(3, 'b', 4),
    ]
)

puts ruleBook.next_states(Set[1], 'b')

# puts ruleBook.next_states(Set[1, 2], 'a')
#
# puts ruleBook.next_states(Set[1, 3], 'b')
#
# puts NFA.new(Set[1], [4], ruleBook).accepting?
#
# puts NFA.new(Set[1, 3, 5], [4], ruleBook).accepting?
#
# puts NFA.new(Set[1, 3, 4], [4], ruleBook).accepting?

# nfa = NFA.new(Set[1], Set[4], ruleBook)

# puts "accepting? => #{nfa.accepting?}"
# nfa.read_character('b')
# puts "accepting? => #{nfa.accepting?}"
# nfa.read_string('ba')
# puts "accepting? => #{nfa.accepting?}"


# nfa_design = NFADesign.new(1, [4], ruleBook)
#
# puts "nfa_design.accepts => #{nfa_design.accepts?("aaaaaaaaaaaa")}"
# puts "nfa_design.accepts => #{nfa_design.accepts?("bbbb")}"

# only_accept_two_rulebook = NFARuleBook.new(
#     [
#         FARule.new(1, "a", 1), FARule.new(1, "a", 2),
#         FARule.new(2, "a", 2), FARule.new(2, "a", 1),
#     ]
# )
#
# only_accept_two_nfa_design = NFADesign.new(1, [2], only_accept_two_rulebook)
#
# puts only_accept_two_nfa_design.accepts?("bbbb")
# puts only_accept_two_nfa_design.accepts?("aa")
