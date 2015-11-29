

#include <SPI.h>


#define LPS331_CS   7

// register addr
#define LPS331_PRESS_OUT_XL   0x28
#define LPS331_PRESS_OUT_L    0x29
#define LPS331_PRESS_OUT_H    0x2A

#define LPS331_TEMP_OUT_L     0x2B
#define LPS331_TEMP_OUT_H     0x2C

#define LPS331_CTRL_REG1      0x20
#define LPS331_CTRL_REG2      0x21
#define LPS331_CTRL_REG3      0x22


void setup()
{
    Serial.begin(9600);
    
    pinMode(LPS331_CS, OUTPUT);
    digitalWrite(LPS331_CS, HIGH);
    
    SPI.begin();
    SPI.setBitOrder(MSBFIRST);
    
    writeRegister(LPS331_CTRL_REG1, 0b11100000);  // init sensor
}

void loop()
{
    uint8_t pxl, pl, ph;
    uint8_t tl, th;
    
    int16_t temp_raw;
    int32_t pres_raw;
    
    float tempC;
    float pressure;
    
    
    pxl = readRegister(LPS331_PRESS_OUT_XL);
    pl  = readRegister(LPS331_PRESS_OUT_L);
    ph  = readRegister(LPS331_PRESS_OUT_H);
    
    tl  = readRegister(LPS331_TEMP_OUT_L);
    th  = readRegister(LPS331_TEMP_OUT_H);
    
    pres_raw = (int32_t)ph << 16 | (uint16_t)pl << 8 | pxl;
    temp_raw = (int16_t)th << 8 | tl;
    
    pressure = (float)pres_raw / 4096;
    tempC    = 39.5 + (float)temp_raw / 480;
    
    //Serial.print("p: ");
    //Serial.print(pressure);
    //Serial.print(" mbar\ta: ");
    //Serial.print(tempC);
    //Serial.println(" deg C");
    Serial.println(tempC);
    
    delay(500);
}


void writeRegister(byte reg, byte value)
{
    digitalWrite(LPS331_CS, LOW);
    
    reg &= 0x3F;
    
    SPI.transfer(reg);
    SPI.transfer(value);
    
    digitalWrite(LPS331_CS, HIGH);
}


byte readRegister(byte reg)
{
    byte value;
    
    digitalWrite(LPS331_CS, LOW);
    
    reg &= 0x3F;
    reg |= 0x80;
    
    SPI.transfer(reg);
    
    value = SPI.transfer(0x00);
    
    digitalWrite(LPS331_CS, HIGH);
    
    return (value);
}

