# Crypto Swing Trading 4H Strategy - Backtest & Tuning Guide

## Quick Start

### Setup in TradingView
1. Open TradingView and navigate to **BTCUSDT** or **ETHUSDT** (Binance recommended)
2. Set timeframe to **4H**
3. Open Pine Script Editor (bottom panel)
4. Paste the strategy code from either:
   - `crypto_swing_4h.pine` (base strategy - more trades, good win rate)
   - `crypto_swing_4h_optimized.pine` (optimized - fewer trades, highest win rate)
5. Click **"Add to Chart"**
6. Open the **Strategy Tester** tab to view backtest results

### Recommended Chart Settings
- **Symbol**: BINANCE:BTCUSDT or BINANCE:ETHUSDT
- **Timeframe**: 4H
- **Backtest period**: At minimum 1 year, ideally 2-3 years
- **Initial Capital**: $10,000
- **Commission**: 0.075% (already configured in strategy)

---

## Strategy Architecture

### Two Versions

| Feature | Base Strategy | Optimized Strategy |
|---------|--------------|-------------------|
| Confluence Filters | 8 conditions (AND logic) | 11 indicators scored |
| Entry Method | All conditions must be true | Score >= 8.5/10.5 |
| Win Rate Target | 65-80% | 80%+ |
| Trade Frequency | Moderate (15-30/year) | Low (8-15/year) |
| Candle Patterns | No | Yes |
| Volatility Filter | No | Yes (ATR-based) |
| Multi-TF Alignment | Daily EMA | Daily + Weekly EMA + Daily RSI |
| Score Dashboard | No | Yes (confluence score) |

### Indicator Stack
Both strategies use this indicator confluence:

1. **200 EMA** - Primary trend direction
2. **21/50 EMA Crossover** - Medium-term trend alignment
3. **RSI (14)** - Momentum sweet spot (not overbought/oversold)
4. **Stochastic RSI** - Entry timing via K/D crossover
5. **MACD Histogram** - Momentum confirmation
6. **ADX (14)** - Trend strength (avoid choppy markets)
7. **Volume** - Participation confirmation
8. **Bollinger Bands** - Support/resistance proximity

Optimized version adds:
9. **Candle Patterns** - Engulfing, pin bars, strong bars
10. **ATR Volatility Filter** - Avoid extreme volatility regimes
11. **Weekly EMA + Daily RSI** - Higher timeframe alignment

---

## Achieving 80%+ Win Rate

### Key Principle
The strategy achieves high win rates by **sacrificing trade frequency for trade quality**. It only enters when 8+ indicators agree, meaning you'll get fewer trades but each one has extremely high probability.

### Step-by-Step Tuning Process

#### Step 1: Start with the Optimized Version
Load `crypto_swing_4h_optimized.pine` on BTCUSDT 4H.

#### Step 2: Check Initial Win Rate
Look at the Strategy Tester tab:
- **Win Rate** should be displayed in the dashboard
- If below 80%, proceed to Step 3

#### Step 3: Adjust the Minimum Score Threshold
The optimized strategy uses a scoring system (max ~10.5 points).
- Default threshold: **8.5**
- To increase win rate: raise to **9.0** or **9.5** (fewer but better trades)
- To increase trade count: lower to **8.0** (more trades, slightly lower win rate)

#### Step 4: Fine-tune RSI Bands
Tightening RSI ranges filters out marginal setups:
- **Long**: Try RSI 44-65 (tighter than default 42-68)
- **Short**: Try RSI 35-56 (tighter than default 32-58)

#### Step 5: Increase Cooldown
If consecutive losing trades occur:
- Raise **Min Bars Between Trades** from 8 to 12-16
- This prevents overtrading after volatile events

#### Step 6: Optimize Stop Loss / Take Profit
The risk management has the biggest impact on win rate:

| Setting | Conservative (Higher WR) | Aggressive (Higher Profit) |
|---------|------------------------|--------------------------|
| Stop Loss | 3.0-3.5% | 2.0-2.5% |
| Take Profit 1 | 2.5-3.0% | 4.0-5.0% |
| Take Profit 2 | 5.0-6.0% | 8.0-10.0% |
| TP1 Exit % | 60-70% | 40-50% |
| Trail Stop | 2.0-2.5% | 1.5-2.0% |

**For 80%+ win rate**: Use wider stop loss (3.0-3.5%) with closer TP1 (2.5-3.0%) and exit 60-70% at TP1.

#### Step 7: BTC vs ETH Adjustments
ETH is more volatile than BTC. Recommended adjustments for ETH:
- Increase Stop Loss by 0.5% (e.g., 3.0% → 3.5%)
- Increase Take Profit targets by 1% each
- Raise volume multiplier to 1.4-1.5
- Lower ADX threshold to 18-20

---

## Recommended Parameter Sets

### BTC/USDT 4H - High Win Rate
```
Stop Loss: 3.0%
Take Profit 1: 3.0%
Take Profit 2: 5.5%
TP1 Exit: 60%
Trailing Stop: 2.0%
Min Score: 8.5
Cooldown: 8 bars
ADX Min: 22
Volume Mult: 1.3
RSI Long: 42-68
RSI Short: 32-58
```

### ETH/USDT 4H - High Win Rate
```
Stop Loss: 3.5%
Take Profit 1: 3.5%
Take Profit 2: 6.5%
TP1 Exit: 60%
Trailing Stop: 2.2%
Min Score: 8.5
Cooldown: 10 bars
ADX Min: 20
Volume Mult: 1.4
RSI Long: 40-66
RSI Short: 34-60
```

---

## Backtest Interpretation

### What to Look For
- **Win Rate**: Target 80%+ (optimized) or 65-80% (base)
- **Profit Factor**: Should be > 2.0 (ideally > 3.0)
- **Max Drawdown**: Should be < 15%
- **Avg Trade**: Should be positive
- **Sharpe Ratio**: > 1.5 is good, > 2.0 is excellent

### Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Win rate < 80% | Filters too loose | Raise min score to 9.0+ |
| Too few trades | Filters too strict | Lower min score to 8.0 |
| Large drawdowns | SL too wide or no trailing | Tighten SL, enable trailing |
| Low profit | TP too close | Increase TP2, reduce TP1 exit % |
| Many losing streaks | Choppy market entries | Raise ADX threshold to 25 |
| Whipsaws | Fast market reversals | Enable candle pattern filter |

### Curve-Fitting Warning
- Always validate on **out-of-sample data** (test on period not used for tuning)
- Split your data: optimize on 2022-2024, validate on 2025+
- Check performance on **both BTC and ETH** — strategy should work on both
- If a parameter change only helps on one pair, it's likely overfitting

---

## Live Trading Setup

### Alerts
Both strategies include alert conditions:
1. In TradingView, right-click on the chart → "Add Alert"
2. Condition: Select the strategy name
3. Choose "Long Entry Signal" or "Short Entry Signal"
4. Set notification method (push, email, webhook)

### Risk Management Rules (Live)
1. **Never risk more than 2% of portfolio per trade**
2. **Confirm 4H candle close** before entering (don't enter mid-candle)
3. **Check higher timeframe** (daily) for any conflicting signals
4. **Avoid trading during** major news events (FOMC, CPI, etc.)
5. **Paper trade for 1 month** minimum before going live
6. **Track every trade** in a journal

---

## File Structure
```
strategies/
├── crypto_swing_4h.pine           # Base strategy (more trades)
├── crypto_swing_4h_optimized.pine # Optimized for 80%+ win rate
└── BACKTEST_GUIDE.md              # This file
```
