import requests
import time
import pymongo
import calendar

def sendmex(state):
    try:
        x = requests.get('http://192.168.1.85/state?sw='+str(state))
        current_time = time.localtime(time.time())
        print(x.text, "\t", current_time.tm_hour,":", current_time.tm_min)
        
    except ConnectionRefusedError as error:
        print('Connection refused:\n{}'.format(error))

    except:
        print('Connection failure')

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['mydb']

while (1):
    
    flag = 0;
    current_epoch = int(time.time())


    #onoff
    col = db['onoff']
    x = col.find_one()
    if (int(x['status']) > 0):
        flag = 1

    print('onoff flag: ', flag)

    #timer
    col = db['timer']
    
    for x in col.find({ "status": { "$ne": "0"} } ):
        timer = x['timer']
        time_expect = ((int(timer[0])*10+int(timer[1]))*60*60)+((int(timer[3])*10+int(timer[4]))*60)

        to_timer = time_expect + int(x['status'])
        
        if (current_epoch < to_timer): 
            flag = 1
        else:
            myquery = { "_id": x['_id'] }
            newvalues = { "$set": { "status": "0" } }
            col.update_one(myquery, newvalues)

    print('timer flag: ', flag)

    #timetable
    current_time = time.localtime(time.time())
    col = db['timetable']

    for x in col.find({ "status": { "$ne": "0"} } ):
        wday = calendar.day_name[current_time.tm_wday][:3].lower()  #maybe with a better db project....
        from_hour = int(x['from'][:2])*60*60 + int(x['from'][-2:])*60
        to_hour = int(x['to'][:2])*60*60 + int(x['to'][-2:])*60
        cur_sec = current_time.tm_hour*60*60 + current_time.tm_min*60
        
        if (int(x[wday]) == 1):              
            if (from_hour <= cur_sec and cur_sec <= to_hour):
                flag = 1

    print('timetable flag: ', flag)
    print('Day: ', current_time.tm_mday, '/', current_time.tm_mon, '/', current_time.tm_year, 
            '\nTime: ', current_time.tm_hour, ":", current_time.tm_min)
    time.sleep(60)
    
    sendmex(flag)



