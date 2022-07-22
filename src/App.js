import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// import answerSlice from './store';
import answerSlice from './store/index';
import QuestionScreen from './components/QuestionScreen';


function App() {

  const store = configureStore({
    reducer: answerSlice.reducer
  })


  return (
   <Provider store={store}>
   <QuestionScreen />
   </Provider>
  );
}

export default App;
