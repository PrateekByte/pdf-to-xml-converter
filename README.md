# PDF to XML Converter

This project is a **PDF to XML Converter** application built using **Node.js**, **Express**, and **React.js**. It allows users to upload PDF files, extract text from them, convert the text to XML format, and manage their conversion history. The application includes a user authentication system for login and registration.

---

## **Features**

- **User Authentication**:
  - Secure login and registration using JWT.
- **PDF to XML Conversion**:
  - Upload a PDF file, extract its content, and convert it to XML format.
- **Conversion History**:
  - View and download previously converted XML files.
- **Responsive Design**:
  - Optimized for both desktop and mobile devices.
- **Error Handling**:
  - Provides clear error messages for invalid inputs or failed operations.

---

## **Project Structure**

```
pdf-to-xml-converter
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── pdfController.js
│   │   │   └── historyController.js
│   │   ├── models
│   │   │   ├── userModel.js
│   │   │   └── historyModel.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── pdfRoutes.js
│   │   │   └── historyRoutes.js
│   │   └── utils
│   │       └── pdfToXmlConverter.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── XmlDisplay.jsx
│   │   │   └── HistoryList.jsx
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   └── HistoryPage.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── README.md
└── .gitignore
```

---

## **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/pdf-to-xml-converter.git
cd pdf-to-xml-converter
```

### **2. Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   PORT=5000 # Port number for the backend server
   MONGO_URI=<your-mongodb-connection-string> # MongoDB connection string
   SESSION_SECRET=<your-session-secret> # Secret key for session management
   JWT_SECRET=<your-jwt-secret> # Secret key for JWT authentication
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### **3. Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

### **4. Access the Application**

- Open your browser and navigate to `http://localhost:3000` to access the application.

---

## **Technology Choices and Reasoning**

### **Frontend**

- **React.js**:
  - Chosen for its component-based architecture, which makes the UI modular and reusable.
  - Provides a responsive and dynamic user experience.
- **React Router**:
  - Used for client-side routing to navigate between pages like login, register, history, and profile.
- **Axios**:
  - Simplifies HTTP requests to the backend API.

### **Backend**

- **Node.js**:
  - Chosen for its asynchronous, non-blocking nature, which is ideal for handling file uploads and processing.
- **Express.js**:
  - Lightweight and flexible framework for building RESTful APIs.
- **Mongoose**:
  - Simplifies interaction with MongoDB, providing schema-based modeling.
- **Multer**:
  - Handles file uploads efficiently in memory for processing PDFs.
- **JWT (JSON Web Tokens)**:
  - Used for secure user authentication and session management.

### **Database**

- **MongoDB**:
  - A NoSQL database chosen for its flexibility in storing user data and conversion history.

### **PDF Processing**

- **pdf-parse**:
  - Extracts text from PDF files for further processing.
- **xmlbuilder2**:
  - Converts the extracted text into structured XML format.

---

## **My Approach to PDF to XML Conversion**

1. **PDF Parsing**:

   - Used `pdf-parse` to extract text content from the uploaded PDF file.
   - Split the text into pages and further into lines for structured processing.

2. **Content Categorization**:

   - Identified different types of content (e.g., titles, lists, tables, paragraphs) based on patterns like uppercase text, bullet points, and tab-separated values.

3. **XML Generation**:

   - Used `xmlbuilder2` to create a structured XML document.
   - Added metadata (e.g., title, author, creation date) and organized content into hierarchical XML elements (e.g., `<page>`, `<title>`, `<list>`, `<table>`).

4. **Storage**:
   - Saved the generated XML data in MongoDB for future retrieval and download.

---

## **Future Improvements**

1. **Enhanced PDF Parsing**:

   - Use advanced libraries like `pdf-lib` or `pdf.js` for better handling of complex PDFs with images, annotations, and embedded fonts.

2. **XML Schema Validation**:

   - Implement XML schema validation to ensure the generated XML adheres to a predefined structure.

3. **Pagination for History**:

   - Add pagination to the history page for better performance and usability when dealing with large datasets.

4. **User Roles**:

   - Introduce roles (e.g., admin, user) for better access control and management.

5. **Improved UI/UX**:

   - Add drag-and-drop functionality for file uploads.
   - Provide real-time progress indicators during file upload and conversion.

6. **Export Options**:

   - Allow users to export the converted XML to other formats like JSON or CSV.

7. **Mobile Responsiveness**:

   - Further optimize the frontend for mobile devices to improve usability on smaller screens.

8. **Error Handling**:

   - Add more detailed error messages and logging for better debugging and user feedback.

9. **Performance Optimization**:

   - Use caching mechanisms (e.g., Redis) to store frequently accessed conversion results.

10. **Cloud Integration**:
    - Integrate with cloud storage services (e.g., AWS S3, Google Drive) for file uploads and downloads.

---

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

Let me know if you need further assistance! 🚀
