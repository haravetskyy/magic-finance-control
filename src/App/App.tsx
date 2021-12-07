import { CreateOperation, Operation } from 'lib/operations'
import { AddOperation } from './Accounts/Operations/AddOperation'
import './App.scss'

function App() {
  const handleSubmit = (values: Operation | CreateOperation) => console.log(values)

  return <AddOperation editableOperation={null} onSubmit={handleSubmit} />
}

export default App
