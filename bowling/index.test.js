/*

- Each game, or “line” of bowling, includes ten turns, or “frames” for the bowler.
- In each frame, the bowler gets up to two tries to knock down all the pins.
- If in two tries, he fails to knock them all down, his score for that frame is the total number
of pins knocked down in his two tries.
- If in two tries he knocks them all down, this is called a “spare” and his score for the frame
is ten plus the number of pins knocked down on his next throw (in his next turn).
- If on his first try in the frame he knocks down all the pins, this is called a “strike”.
His turn is over, and his score for the frame is ten plus the simple total of
the pins knocked down in his next two rolls.
- If he gets a spare or strike in the last (tenth) frame,
the bowler gets to throw one or two more bonus balls, respectively.
These bonus throws are taken as part of the same turn.
If the bonus throws knock down all the pins, the process does not repeat:
the bonus throws are only used to calculate the score of the final frame.
- The game score is the total of all frame scores.

(When scoring “X” indicates a strike, “/” indicates a spare, “-” indicates a miss)

X X X X X X X X X X X X (12 rolls: 12 strikes) = 10 frames * 30 points = 300
9- 9- 9- 9- 9- 9- 9- 9- 9- 9- (20 rolls: 10 pairs of 9 and miss) = 10 frames * 9 points = 90
5/ 5/ 5/ 7/ 5/ 5/ 5/ 5/ 5/ 5/5 (21 rolls: 10 pairs of 5 and spare, with a final 5) = 10 frames * 15 points = 150

0,0    10  5,5  
*/
const scoreBowling = require('./index')

describe("Bowling Game", () => {
  it("should score 0 for an empty set of throws", () => {
    const allThrowsFailed = ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--"];

    const result = scoreBowling(allThrowsFailed);
    expect(result).toBe(0)
  });

  it("should score 5 if we just have a miss on the first throw and 5 on the second throw", () => {
    const result = scoreBowling(["-5", "--", "--", "--", "--", "--", "--", "--", "--", "--"])
    expect(result).toBe(5)
  })

  it("should score 5 if we just have a 5 on the first throw and a miss on the second throw", () => {
    const result = scoreBowling(["5-", "--", "--", "--", "--", "--", "--", "--", "--", "--"])
    expect(result).toBe(5)
  })

  it("should score 5 if we have all misses until the final frame, which is a 5 and a miss", () => {
    const result = scoreBowling(["--", "--", "--", "--", "--", "--", "--", "--", "--", "5-"])
    expect(result).toBe(5)
  })

  it("should score 10 if we have a spare in the first throw", () => {
    const result = scoreBowling(["5/", "--", "--", "--", "--", "--", "--", "--", "--", "--"])
    expect(result).toBe(10)
  })
})

// What about?
// frames = [
//   "--",
//   "1-",
//   "-2",
//   "5/",
//   "X",
//   "6-",
//   "8/",
//   "31"
// ]