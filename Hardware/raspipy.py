# -*- coding: utf-8 -*-
import serial
import time
import requests
time.time()

times = 0

ser = serial.Serial('/dev/ttyACM0', timeout=0.1) 
while True:
	print times,"second"
	
	line = ser.readline()

	line = str(line).rstrip("\r\n")

	print "data",line,"line"

	
	if(times>30):
		times = 0

		print "Sending"
		q = {'function':'thermo','name':'A1','value':line}

		#q['value'].rstrip("\r")
		#q['value'].rstrip("\n")

		r = requests.get('http://192.168.0.100/', params=q)
		print "SendComplete"
	times = times+1
	time.sleep(1)
print "End"
ser.close()