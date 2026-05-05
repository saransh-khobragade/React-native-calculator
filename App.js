import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const BUTTONS = [
  ['C', '+/-', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function App() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const formatResult = (value) => {
    if (!Number.isFinite(value)) {
      return 'Error';
    }

    const formatted = parseFloat(value.toFixed(8)).toString();
    return formatted.length > 12 ? Number(value).toExponential(6) : formatted;
  };

  const calculate = (left, right, nextOperator) => {
    switch (nextOperator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return right === 0 ? NaN : left / right;
      default:
        return right;
    }
  };

  const handleNumber = (value) => {
    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => {
      if (current === '0' || current === 'Error') {
        return value;
      }

      return current.length >= 12 ? current : current + value;
    });
  };

  const handleDecimal = () => {
    if (waitingForOperand || display === 'Error') {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    if (display === '0' || display === 'Error') {
      return;
    }

    setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`);
  };

  const handlePercent = () => {
    if (display === 'Error') {
      return;
    }

    setDisplay(formatResult(Number(display) / 100));
  };

  const handleOperator = (nextOperator) => {
    const inputValue = Number(display);

    if (display === 'Error') {
      return;
    }

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = calculate(storedValue, inputValue, operator);
      const formatted = formatResult(result);

      setDisplay(formatted);
      setStoredValue(Number.isFinite(result) ? result : null);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (!operator || waitingForOperand || display === 'Error') {
      return;
    }

    const result = calculate(storedValue ?? 0, Number(display), operator);
    const formatted = formatResult(result);

    setDisplay(formatted);
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handlePress = (value) => {
    if (/^\d$/.test(value)) {
      handleNumber(value);
      return;
    }

    switch (value) {
      case '.':
        handleDecimal();
        break;
      case 'C':
        handleClear();
        break;
      case '+/-':
        handleToggleSign();
        break;
      case '%':
        handlePercent();
        break;
      case '=':
        handleEquals();
        break;
      default:
        handleOperator(value);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.calculator}>
        <View style={styles.displayWrap}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.display}
          >
            {display}
          </Text>
        </View>

        <View style={styles.keypad}>
          {BUTTONS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((button) => {
                const isOperator = ['/', '*', '-', '+', '='].includes(button);
                const isZero = button === '0';
                const isFunction = ['C', '+/-', '%'].includes(button);
                const isActiveOperator =
                  button !== '=' && isOperator && operator === button && waitingForOperand;

                return (
                  <Pressable
                    key={button}
                    onPress={() => handlePress(button)}
                    style={({ pressed }) => [
                      styles.button,
                      isOperator && styles.operatorButton,
                      isFunction && styles.functionButton,
                      isZero && styles.zeroButton,
                      isActiveOperator && styles.activeOperatorButton,
                      pressed && styles.pressedButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        isFunction && styles.functionButtonText,
                        isActiveOperator && styles.activeOperatorButtonText,
                      ]}
                    >
                      {button === 'C' ? 'AC' : button}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    paddingHorizontal: 14,
    paddingBottom: 24,
    paddingTop: 48,
  },
  calculator: {
    gap: 14,
  },
  displayWrap: {
    minHeight: 180,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  display: {
    color: '#ffffff',
    fontSize: 82,
    fontWeight: '200',
  },
  keypad: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  activeOperatorButton: {
    backgroundColor: '#ffffff',
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  zeroButton: {
    flex: 2.12,
    alignItems: 'flex-start',
    paddingLeft: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '400',
  },
  functionButtonText: {
    color: '#000000',
  },
  activeOperatorButtonText: {
    color: '#ff9f0a',
  },
  pressedButton: {
    opacity: 0.72,
  },
});
