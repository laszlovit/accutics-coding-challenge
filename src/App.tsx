import './App.css';
import data from './data/test-data.json';
import { Field } from './types';

function App() {
  return (
    <>
      <h1>Accutics coding challenge</h1>
      <div className="flex flex-col gap-y-2">
        {data.map((item: Field) => (
          <div key={item.field_key}>
            <p>{item.field_name}</p>
            {item.options.map((option) => (
              <div key={option.option_label}>
                <p>{option.option_label}</p>
                <p>{option.option_value}</p>
              </div>
            ))}
            {item.rules.map((item) => (
              <div key={`rule-${item.rule_field_key}`}>
                <p>{item.rule_value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
