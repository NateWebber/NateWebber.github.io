---
layout: post
---

## Introduction
&emsp; On New Year’s Eve of 2021, my girlfriend and I were
looking through her cabinet of board games, when we found a
copy of Mastermind. I hadn’t thought about the game in years,
but I really enjoyed playing it as a kid, so we decided to play a
few rounds. While we were playing, I started to wonder if it
would be possible to program a computer to play the game. I
had just finished a course in AI so the common approaches
were fresh in my mind; in need of a new project, I decided to do
some research, and see what I could put together.

&emsp; If you aren’t familiar, Mastermind is a 2-player board game in which one player assumes
the role of “codemaker”, and the other “codebreaker”. The codemaker makes a secret code
using four colored pegs, and hides it from the view of the codebreaker. The codebreaker then
proceeds to use other colored pegs to make guesses about what the secret code might be.
After every guess, the codemaker provides feedback using smaller red and white pegs. A red
peg indicates that one of the guessed pegs is exactly the same as one of the code’s pegs, in
both color and position. A white peg indicates a correctly colored, but incorrectly placed peg. No
peg at all indicates an entirely wrong guess. For example, if the secret code were <span style="color:red">RED</span> BLACK
<span style="color:green">GREEN</span> <span style="color:blue">BLUE</span>, and the guess was <span style="color:red">RED</span> BLACK <span style="color:blue">BLUE</span> <span style="color:white; background-color:black">WHITE</span>, the feedback would be two red’s
(red and black are correct), one white (blue is correct but in the wrong spot), and one empty slot
(white is not in the secret code at all).

&emsp; With the idea in my head, the first major project I undertook during 2022 was this: can I
write a program that can play Mastermind? More specifically, can I write one to take on the role
of codebreaker? Writing a program that randomly picked a code and gave the user feedback would be a trivial undertaking, but I wanted to see if I could get a program to “think and deduce a secret code that the user chose. The first step, as always, was research.

## Solving Mastermind

&emsp; A recurring theme in computer science work is that oftentimes, if you need code or an
algorithm to do a specific thing, somebody far smarter than you has already figured it out.
Computer science finds its origins in the broader field of mathematics, after all, so even though
computers are only some 70-80 years old, there are plenty of giants whose shoulders make
great places to stand. Mastermind is no exception to this: in 1977 mathematician Donald Knuth
demonstrated that there is an algorithm guaranteed to win using at most 5(!) guesses. I am no
mathematician, so the proof of why this algorithm works is beyond me, but if that sounds like
something you would like to know, I’ve included a link to Knuth’s original paper at the end of this
writeup. The important part, for me at least, is just the actual steps. From the Wikipedia page,
the steps of the algorithm are as follows:

1. Create the set S of 1,296 possible codes (1111, 1112 ... 6665, 6666)
2. Start with initial guess 1122 (Knuth gives examples showing that this algorithm using other first
guesses such as 1123, 1234 does not win in five tries on every code)
3. Play the guess to get a response of coloured and white pegs.
4. If the response is four colored pegs, the game is won, the algorithm terminates.
5. Otherwise, remove from S any code that would not give the same response if it (the guess) were
the code.
6. Apply minimax technique to find a next guess as follows: For each possible guess, that is, any
unused code of the 1,296 not just those in S, calculate how many possibilities in S would be
eliminated for each possible colored/white peg score. The score of a guess is the minimum
number of possibilities it might eliminate from S. A single pass through S for each unused code of
the 1,296 will provide a hit count for each coloured/white peg score found; the coloured/white peg
score with the highest hit count will eliminate the fewest possibilities; calculate the score of a
guess by using "minimum eliminated" = "count of elements in S" - (minus) "highest hit count".
From the set of guesses with the maximum score, select one as the next guess, choosing a
member of S whenever possible. (Knuth follows the convention of choosing the guess with the
least numeric value e.g. 2345 is lower than 3456. Knuth also gives an example showing that in
some cases no member of S will be among the highest scoring guesses and thus the guess
cannot win on the next turn, yet will be necessary to assure a win in five.)
7. Repeat from step 3.

&emsp; If you’re anything like me, reading that was probably going ok, until you reached step 6, which is
a bit of a doozy. Fortunately for me, the class I had just finished had an entire unit about
algorithms like minimax, so I already understood the underlying concept. Trying to effectively
teach the finer points of the minimax algorithm is beyond the scope of what I’m going for in this
writeup, but I would be remiss if I didn’t at least offer a brief summary.

&emsp; In short, minimax is a decision making process, in which one tries to determine the
optimal choice by making the worst case outcome as good as possible (i.e. to minimize the
maximum possible loss). It’s frequently employed in cases of adversarial games, which could
include any two-player game, ranging in complexity from Tic-Tac-Toe to Chess or Go (As a
matter of fact, minimax powers some of the best AI for playing both of those games). To use
minimax, we essentially look at all the possible next choices, and for each of those choices, we
then look at the possible outcomes. If necessary, we repeat this multiple times, going one
decision further into the future with every step. In all of these, if it’s our decision, we assume we
will face the worst outcome, and if it’s the “opponent’s”, we assume they will face the best one.
The key takeaway, and the only one you really need, is this: minimax finds its usefulness
as a decision strategy in the fact that it tells us which decision to make to ensure that the worst
possible outcome is still as good for us as possible.

&emsp; So, in applying this idea to Mastermind, we see the key to the strategy. Of all the
guesses we could make, we assume the worst possible outcome; in this problem, the worst
outcome is removing the least number of possible alternatives. We then find the guess that, in
said worst case, still gives us the best outcome i.e. eliminates the most removing possibilities.

&emsp; Once I fully understood the process, the only remaining matter was to actually write the code.
I’m happy to report that that process went fairly smoothly. There were the usual hiccups along
the way, but there weren’t any major roadblocks. The exact details of my implementation are
also not what I’m hoping to explore here, but if you’re curious, the source code can be found in
the links at the end of this writeup.

## Difficulty Adapting To Wordle
&emsp; Shortly after I threw together this Mastermind project, Wordle took the internet by storm.
On the off chance you’re unfamiliar with it, Wordle is an online word game that recently went
viral, and was purchased by the New York Times for an undisclosed 7 figure sum. The game
plays exactly as mastermind does, except instead of trying to guess a 4-color code, you instead
are trying to guess a 5-letter English word. Both I, and nearly every other programmer (one
need only google things like “Wordle solver” to confirm this), immediately had the idea to try and
develop a program to play the game. Since I had just finished this Mastermind project, I naively
thought that this would be an easy step to take. Simply refactor some of the program to account
for five-letter words instead of color codes, go into the website to get a copy of what Wordle
considers to be valid words, and I should be good to go. (Also, choose a starting word. I went
with “roate”, because all of those letters are extremely common). I made the changes, compiled
the code, and pressed run.

&emsp; And then I waited...

&emsp; And waited...

&emsp; And waited some more.

&emsp; Nothing. A program that, for Mastermind, made its guesses in a fraction of a second, sat
and churned away while my laptop’s fans whirred for minute after minute, with no end in sight.
Clearly something was wrong, and that problem was scale. An algorithm like minimax is
interesting because it couldn’t, except in trivially small cases, be done by a human being.
Making calculations so many steps into the future, with each step having more and more
options every time, just isn’t feasible for a human brain to do in any remotely reasonable
timeframe. The only reason we can use it at all is because crunching immense amounts of data
is a computer’s specialty; approaches like these are not only possible, they actually play to the
computer’s strengths. But even those strengths have limits. In a typical game of Mastermind,
there are only 1296 unique possible codes. That’s a trivially small number to a computer, it can
solve that without even blinking. However, Wordle’s dictionary of valid 5-letter words has about
13,000 entries. That’s an increase by an order of magnitude. Furthermore, an increase of the
code’s length from 4 to 5 may seem negligible, and at small scales it is, but when you’re doing
thousands and thousands of calculations, those extra time costs really start to add up.

## So How Can I Fix This?

&emsp; I liked the idea of using a minimax system to solve Wordle. Maybe it was because I was
being lazy determined not to throw the baby out with the bath water, maybe it was because I felt
I had a recent, solid grasp on the theory behind the approach, or maybe it was because I just
felt a solution to Mastermind logically had to work on Wordle, in some capacity. In truth, it was
likely some combination of all these that made me determined to stick with minimax and try to
improve it, rather than just starting over from scratch. Whether that was the prudent thing to do
is questionable in hindsight, but regardless I feel good about the improvements I made. Here’s a
little bit about some of them.

# Delaying Minimax
&emsp; The primary problem with the program as it was, was that minimax is simply too slow an
approach to be using on a search of that size. So, I figured that if I could maybe reduce the
sample size a few times, admittedly with less precision than a full minimax would offer, I could
then switch over to minimax once it would be reasonable to do so. This was the first big step
towards improving the system. Instead of running minimax, for the first two guesses, I would
filter words that were no longer possible like usual, but then just select a new word to guess
randomly. After two guesses, the pool of possibilities was usually reduced enough that I could
run minimax without it taking too long (although it did still stall for a little bit). After this change, I
was able to get my first successful games! But there was still work to be done.

# Improving Filtering
&emsp; Now that I was relying on the filtering of impossible words more heavily, my attention
was turned back to it. I remember suddenly realizing that I, in my zeal to convert my existing
solution, had made a massive oversight. In Mastermind, the only information that you get is how
many perfect, incorrectly placed, and entirely incorrect pegs you have in your guess. In Wordle,
however, you get to know exactly which letters are in the correct position, which ones are
present but in the wrong position, and which ones are not in the word at all. This was a huge
amount of information, and I was just throwing it out, because I hadn’t considered it. So, I
quickly revised my filtering system, and now it was throwing away, in some cases, literally
thousands more words each time. This was a massive improvement, easily the most impactful
of the three I’m talking about here.

# Scoring Letters
&emsp; The last improvement I made that I want to mention was a system for scoring letters. I
didn’t like how, during the initial non-minimax filtering, I was just choosing a next guess at
random. Sure, I could just pick another dedicated second guess, like my first one, but I was
interested in seeing if I could do something a little more dynamic. As a matter of fact, it was
quite important that I did try to solve this problem, because there was a second issue beyond
minimax taking too long. Sometimes, when the program was close to getting the answer, it
would have something like “-READ”. A human being would likely guess “BREAD” next, since
that’s probably the most common word, but my program would be equally likely to try “TREAD”
or “DREAD”, because it didn’t have that human intuition. In some particularly bad cases it would
burn up 3 or 4 guesses in this manner by trying very obscure words.
&emsp; I was stumped for a little while, but then I had an idea. In Scrabble, letters are given
individual scores that are loosely based on how commonly they appear in English words. There
are low scoring, common letters like ‘E’, and higher scoring, rarer letters like ‘X’ and ‘J’. I
decided to tell the program that when making decisions between words evaluated as equally
good by minimax (which was usually when there was only one letter missing), to prefer words
that would score worse in Scrabble. I then took it a step further, and wrote a small program to
calculate the frequency of different letters in the Wordle dictionary, and used those statistics to
inform this decision instead. The results of this improvement were actually somewhat
disappointing. It solved the problem some of the time, but other times it would still burn guesses
on unlikely words. Clearly pure letter frequency wasn’t the answer, and this problem still lingers
in my program.

## Conclusion
&emsp; That’s about where my Wordle journey ended, at least for now. My school semester
started up, so coursework and summer planning took priority over things like this. As it currently
stands, the program works surprisingly well, in my opinion. It often manages to get the answer
in the six guesses you’re allotted by the official website, and if it doesn’t it usually only needs
one or two more. If you’re interested, I’ve linked to the github repository with a number of
different iterations of the program in the links section. I learned a lot about optimization and
problem solving over the course of this project, and I’m really glad I took the time to explore it.
That’s all I have for today, so thank you for reading!

## Cool Links I Used/You Should Totally Check Out
- [Donald Knuth's Original 1977 Mastermind Paper](http://www.cs.uni.edu/~wallingf/teaching/cs3530/resources/knuth-mastermind.pdf)
- [Mastermind on Wikipedia](https://en.wikipedia.org/wiki/Mastermind_%28board_game%29)
- [Minimax on Wikipedia](https://en.wikipedia.org/wiki/Minimax)
- [Mastermind Code (My Github)](https://github.com/NateWebber/JavaMastermind/blob/main/Mastermind.java)
- [Wordle (NYT)](https://www.nytimes.com/games/wordle/index.html)
- [Wordle Code (My Github)](https://github.com/NateWebber/JavaWordle)