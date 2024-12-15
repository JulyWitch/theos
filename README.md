# IoT Struct Tool

A powerful web-based tool for working with C structs and hex buffers in IoT applications. This tool allows developers to easily parse and construct hex buffers based on C struct definitions, with support for both little-endian and big-endian byte orders.

## Features

- **C Struct Definition**: Input C struct definitions with support for common data types
- **Dual Mode Operation**:
    - Parse Mode: Convert hex buffers to structured data
    - Construct Mode: Build hex buffers from field values
- **Endianness Support**:
    - Little Endian
    - Big Endian
- **Real-time Processing**: Instant updates as you type or modify values
- **Supported Data Types**:
    - Boolean (`bool`)
    - 8-bit integers (`uint8_t`, `int8_t`)
    - 16-bit integers (`uint16_t`, `int16_t`)
    - 32-bit integers (`uint32_t`, `int32_t`)
    - Floating point (`float`, `double`)
- **Copy to Clipboard**: One-click copying of generated hex buffers

## Usage

### Parse Mode

1. Enter your C struct definition in the text area
2. Switch to "Parse" mode
3. Input a hex buffer string
4. View the parsed data in structured format below

Example struct:

```
struct SensorData {
  bool enabled;
  uint8_t type;
  uint16_t value;
  uint32_t timestamp;
};
```

### Construct Mode

1. Define your C struct
2. Switch to "Construct" mode
3. Fill in values for each field
4. Copy the generated hex buffer using the copy button

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vite

## Development

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

## Building for Production

```
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

This project is designed to help IoT developers work more efficiently with binary data structures and hex buffers. Feel free to report issues or suggest improvements!
