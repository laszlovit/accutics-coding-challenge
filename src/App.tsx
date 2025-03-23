import { useState } from 'react';
import './App.css';
import Container from './components/ui/container';
import data from './data/test-data.json';
import { Field } from './types';
import { FieldContext } from './context/field-context';
import FieldsList from './components/fields-list';
import AddField from './components/add-field';

function App() {
  const [fields, setFields] = useState<Field[]>(data);

  return (
    <FieldContext.Provider value={{ fields, setFields }}>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Accutics Coding Challenge
            </h1>
          </div>
        </header>
        <main>
          <Container>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:mx-0 lg:max-w-none lg:grid-cols-12">
              <FieldsList />
              <div className="order-1 sm:order-2 lg:col-span-4 flex flex-col gap-y-2">
                <AddField />
              </div>
            </div>
          </Container>
        </main>
      </div>
    </FieldContext.Provider>
  );
}

export default App;
