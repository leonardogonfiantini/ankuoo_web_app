import pymysql
import requests
import time


def sendmex(state):
    try:
        x = requests.get('http://192.168.1.114/state?sw='+str(state))
        current_time = time.localtime(time.time())
        print(x.text, "\t", current_time.tm_hour,":", current_time.tm_min)
        
    except:
        print('Connessione non riuscita')

while (True):
    connection = pymysql.connect(host="localhost",user="root",passwd="1234",database="dbtime" )
    cursor = connection.cursor()

    timetable = "Select * from time;"
    timeupdateon = "Update ONOFF set onoff = 1 where id = 0;"
    timeupdateoff = "Update ONOFF set onoff = 0 where id = 0;"

    x = 0

    cursor.execute(timetable)
    rows = cursor.fetchall()
    for i in range(23):
        for j in range(1,8):
            current_time = time.localtime(time.time())
            hour = current_time.tm_hour
            day = current_time.tm_wday + 1
            if (hour <= i and hour+1 > i and day == j):
                if (rows[i][j] == 1):
                    x = 1
                else:
                    x = 0


    onofftable = "Select * from ONOFF;"
    cursor.execute(onofftable)
    row = cursor.fetchall()
    if (row[0][1] == 1 or x == 1):
        sendmex(1)
    elif(row[0][1] == 0 or x == 0):
        sendmex(0)
    
    time.sleep(40)
    
