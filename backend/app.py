from datetime import datetime
from time import strftime
from datetime import *
from ib_insync import *
from ibapi import *
# from ib_insync.client import *
import pandas as pd
import time
# from ib_insync.wrapper import(Wrapper)

# now = datetime.now()
# current_time = now.strftime("%H:%M:%S")
# print("Current Time is :", current_time)


class OptionsTradingBot():

    """Specifies entry and exit conditions
        Buys call contracts after 2 consecutive green candles
        Buys Put contracts after 2 consecutive red candles
    """

    def __init__(inputSymbol):
        # goto keyword
        try:
            global ib, account
            ib = IB()
            ib.connect('127.0.0.1', 7497, clientId=1)
            print("Ib connection established?: ", ib.isConnected())
            account = "DU5541128"
        except:
            print("Error: Failed to Establish Remote Connection")
            exit()

        global contract, contract1, contract2, contract3, contract4
        contract = Forex('EURUSD')

        # contract1 = Option("TSLA", 20220624,
        #                    710, 'C', 'SMART')

        # contract2 = Option("TSLA", 20220624,
        #                    690, 'P', 'SMART')

        contract3 = Stock(symbol=inputSymbol, exchange='SMART', currency='USD')

        #contract4 = Future('ES', '20220617', 'GLOBEX')

        global live, buyorder, sellorder
        # chagne these to midpoint adaptive
        buyorder = MarketOrder("Buy", 1)
        sellorder = MarketOrder("Sell", 1)

    __init__()

    x=ib.placeOrder(contract3, buyorder)
    print(x)









# options to chain to purhcase at the money contracts
# bracket order 1: 2 risk to reward
# pnl updater + live price update along with time update

# experiment with trailing stop losses and mid point entry and exit
# add self updating contract expiration date
# scheduler opens the program at 9:30 and closes at 11:30 (closes all orders before exiting)
#    # __init__ while loop entry
#    # n = strftime("%H:%M:%S")
#    # while n >= 9:30:00

#    # Time checker while loop exit
#    # n = strftime("%H:%M:%S")
#    # while n <= 11:30:00
#    # disconnect()
#    # updates overall pnl and other stats at end of trading day
#    # make takeprofit = sell stop


# controlling for variables
# Tesla stock
# 9:30am to 11:30am
# buying ATM contracts
# 1 to 2 risk to reward ratio
