/* eslint-disable react/prop-types */
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '6px',
    padding: '0.5rem',
    background: '#E6E8FA',
    color: '#222',
    textAlign: 'center',
    border: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: state.isSelected ? 'center' : 'left',
    color: state.isSelected ? '#FFFFFF' : '#222',
    background: state.isSelected ? '#684edc' : '#FFFFFF',
    fontSize: state.isSelected ? '13px' : '13px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#737373',
    fontSize: '15px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#222',
    textAlign: 'center',
    fontSize: '15px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const options = [
  { value: 'Dinheiro', label: 'Dinheiro' },
  { value: 'Pix', label: 'Pix' },
  { value: 'Cartão de Crédito', label: 'Cartão de Crédito' },
  { value: 'Cartão de Débito', label: 'Cartão de Débito' },
];

const CustomSelect = ({ onChange }) => (
  <Select
    styles={customStyles}
    options={options}
    placeholder="Selecione a forma de pagamento..."
    onChange={onChange}
  />
);

export default CustomSelect;
