import React, { useState } from 'react';
import { Button, Picker, Form, DatePicker, Card, Toast } from 'antd-mobile';
import { GenderType, Result, calculateRetirement } from './utils/retirement';
import './App.css'
import { UndoOutline } from 'antd-mobile-icons';
import { Notice } from './components/notice';

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

  const [genderVisible, setGenderVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [workVisible, setWorkVisible] = useState(false);

  const handleSubmit = () => {
    if (!birthDate || !gender) {
      Toast.show({
        content: '请填写完整信息',
      });
      return;
    }

    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth() + 1;

    const result = calculateRetirement(birthYear, birthMonth, gender, gender === 'female' && isFemaleWorker === '55');
    setResult(result);
  };

  const handleReset = () => {
    setResult(null);
    setGender(null);
    setBirthDate(null);
    setIsFemaleWorker('55');
  };

  return (<>
  <div className='card-main'>
    {!result ? (
      <Card >
        <Form layout="horizontal">
          <Form.Item label="输入您的信息">
          </Form.Item>
          <Form.Item label="性别">
            <Button
              onClick={() => setGenderVisible(true)}
            >
              {genderOptions.find((item) => item.value === gender)?.label || '选择'}
            </Button>

            <Picker
              visible={genderVisible}
              onClose={() => setGenderVisible(false)}
              columns={[genderOptions]}
              onConfirm={(value) => setGender(value[0] as GenderType)}
            />
          </Form.Item>

          <Form.Item label="出生年月">
            <Button
              onClick={() => setDateVisible(true)}
            >
              {birthDate ? `${birthDate.getFullYear()}/${birthDate.getMonth() + 1}` : '选择'}
            </Button>
            <DatePicker
              visible={dateVisible}
              onClose={() => setDateVisible(false)}
              min={new Date(1965, 0, 1)}
              precision="month"
              defaultValue={new Date(1990, 0, 1)}
              onConfirm={(date) => setBirthDate(date)}
            />
          </Form.Item>

          {gender === 'female' && (
            <Form.Item label="工作类型">
              <Button
                onClick={() => setWorkVisible(true)}
              >
                {workerOptions.find((item) => item.value === isFemaleWorker)?.label || '选择'}
              </Button>
              <Picker
                visible={workVisible}
                onClose={() => setWorkVisible(false)}
                columns={[workerOptions]}
                onConfirm={(value) => setIsFemaleWorker(value[0] as WorkerType)}
              />
            </Form.Item>
          )}
        </Form>

        <div className='btn-card-footer'><Button block color="primary" onClick={handleSubmit}>
          开始计算
        </Button></div>

      </Card>
    ) : (
      <Card>
        <Form layout="horizontal">
          <Form.Item label="计算结果">
          </Form.Item>
          <Form.Item label="退休年龄">
            <b><span className='retirement-age-year'>{result.retirementAgeYear}</span> 岁{result.retirementAgeMonth !== 0 && <span> {result.retirementAgeMonth} 个月</span>}</b>
          </Form.Item>
          <Form.Item label="退休时间">
            <b>{result.retirementYear}/{result.retirementMonth}</b>
          </Form.Item>
          <Form.Item label="延迟退休月数">
            <b>{result.delayMonths}</b>
          </Form.Item>
        </Form>
        <div className='btn-card-footer'>
          <Button block onClick={handleReset}>
            <UndoOutline className='btn-card-footer-icon' /> 重新计算
          </Button>
        </div>
      </Card>
    )}


  </div>

    <div className='card-notice'>
      <Notice />
    </div>
  </>
  );
};

export default App;
