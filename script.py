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
        print('Connessione rifiutata:\n{}'.format(error))

    except:
        print('Connessione non riuscita')

while (1):
    
    flag = 0;
    current_epoch = int(time.time())

    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client['mydb']

    #onoff
    col = db['onoff']
    x = col.find_one()
    if (int(x['status']) > 0):
        flag = 1

    print('flag: ', flag)

    #timer
    col = db['timer']
    for x in col.find({ "status": { "$gt": 0} } ):
        timer = x['timer']
        time_expect =  ((int(timer[0])*10+int(timer[1]))*60*60)+((int(timer[3])*10+int(timer[4]))*60)

        if (current_epoch < x['status']+time_expect): 
            flag = 1
        else:
            myquery = { "timer": timer }
            newvalues = { "$set": { "status": 0 } }
            col.update_one(myquery, newvalues)

    print('flag: ', flag)

    #timetable
    current_time = time.localtime(time.time())
    col = db['timetable']

    for x in col.find({ "status": { "$gt": 0} } ):
        wday = calendar.day_name[current_time.tm_wday][:3].lower()  #maybe with a better db project....
        if (int(x[wday]) == 1):              
            if (int(x['from'][:2]) <= current_time.tm_hour and int(x['from'][-2:]) <= current_time.tm_min
                    and int(x['to'][:2]) >= current_time.tm_hour and int(x['to'][-2:]) <= current_time.tm_min):
                
                flag = 1

    print('flag: ', flag)


#sendmex(flag)
