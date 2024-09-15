// App.tsx
import React, { useState } from 'react';
import { Button, Picker, Form, DatePicker, Card, Toast } from 'antd-mobile';
import { GenderType, Result, calculateRetirement } from './utils/retirement';
import './App.css'


type WorkerType = '50' | '55';


const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const workerOptions = [
  { label: '女职工（原50岁退休）', value: '50' },
  { label: '女职工（原55岁退休）', value: '55' },
];

const App: React.FC = () => {
  const [gender, setGender] = useState<GenderType | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isFemaleWorker, setIsFemaleWorker] = useState<WorkerType>('55');
  const [result, setResult] = useState<Result | null>(null);

  const [genderVisible, setGenderVisible] = useState(false)
  const [dateVisible, setDateVisible] = useState(false)
  const [workVisible, setWorkVisible] = useState(false)

  const handleSubmit = () => {
    if (!birthDate || !gender) {
      Toast.show({
        content: '请填写完整信息',
      });
      return;
    }

    // Extract birth year and month
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth() + 1;

    // Call the calculateRetirement function (real implementation should be used)
    const result = calculateRetirement(birthYear, birthMonth, gender, gender === 'female' && isFemaleWorker === '55');
    setResult(result);
  };

  return (
    <div>

      <div><h1 className='title'>延迟退休年龄计算器</h1></div>

      <Card>
        <Form layout="horizontal">
          <Form.Item label="性别">

            <Button
              onClick={() => {
                setGenderVisible(true)
              }}
            >
              {genderOptions.find((item) => item.value === gender)?.label || '选择'}
            </Button>

            <Picker
              visible={genderVisible}
              onClose={() => {
                setGenderVisible(false)
              }}
              columns={[genderOptions]}
              onConfirm={(value) => setGender(value[0] as GenderType)}
            >
            </Picker>
          </Form.Item>

          <Form.Item label="出生年月">
            <Button
              onClick={() => {
                setDateVisible(true)
              }}
            >
              {birthDate ? `${birthDate.getFullYear()}/${birthDate.getMonth() + 1}` : '选择'}
            </Button>
            <DatePicker
              visible={dateVisible}
              onClose={() => {
                setDateVisible(false)
              }}
              min={new Date(1965, 0, 1)}
              precision="month"
              onConfirm={(date) => setBirthDate(date)}
            >
            </DatePicker>
          </Form.Item>

          {gender === 'female' && (
            <Form.Item label="工作类型">
              <Button
                onClick={() => {
                  setWorkVisible(true)
                }}
              >
                {workerOptions.find((item) => item.value === isFemaleWorker)?.label || '选择'}
              </Button>
              <Picker
                visible={workVisible}
                onClose={() => {
                  setWorkVisible(false)
                }}
                columns={[workerOptions]}
                onConfirm={(value) => setIsFemaleWorker(value[0] as WorkerType)}
              >
              </Picker>
            </Form.Item>
          )}
        </Form>

        <Button block color="primary" onClick={handleSubmit}>
          开始计算
        </Button>

        {result && (
          <div>
            <h3>计算结果：</h3>
            <p>退休时间: {result.retirementYear}/{result.retirementMonth}</p>
            <p>退休年龄: {result.retirementAgeYear} 岁 {result.retirementAgeMonth} 个月</p>
            <p>延迟退休月数: {result.delayMonths}</p>
          </div>
        )}
      </Card>
    </div>
  );
};


export default App;
