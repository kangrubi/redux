import React, { useState, useReducer } from 'react';
import Student from './Student';

const reducer = (state, active) => {
  switch (active.type) {
    case 'add-student':
      const name = active.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case 'delete-student':
      return {
        count: state.count - 1,
        students: state.students.filter(
          student => student.id !== active.payload.id
        ),
      };
    case 'mark-student':
      return {
        count: state.count,
        students: state.students.map(student => {
          if (student.id === active.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};
// delete-student: student id는 payload에 있는 id와 같다면 그 학생을 빼고 나머지 학생을 반환

// obj 형태
const initialState = {
  count: 0,
  students: [],
};

function Test() {
  const [name, setName] = useState('');
  const [studentInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수: {studentInfo.count}</p>
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: 'add-student', payload: { name } });
        }}
      >
        추가
      </button>
      {studentInfo.students.map(student => {
        return (
          <Student
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
    </div>
  );
}

export default Test;
