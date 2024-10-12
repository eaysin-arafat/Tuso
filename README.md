# Tuso

## Overview

Tuso is a robust system issue tracking platform designed to streamline the process of reporting, managing, and resolving system issues efficiently. With Tuso, users can easily report system issues they encounter, while support staff can effectively track, prioritize, and resolve these issues in a timely manner. Tuso also includes Remote Desktop Protocol (RDP) feature, allowing support staff to establish live connections with users' systems to diagnose and resolve issues in real-time. The platform provides a user-friendly interface for both users and support staff, ensuring seamless communication and collaboration throughout the issue resolution process.

## Features

- **User Authentication:** Tuso features a secure user authentication system, allowing users to register, log in, and manage their accounts securely. This ensures that only authorized users can access the platform and report system issues.

- **Intuitive Ticket Creation:** Users can create tickets to report system issues effortlessly. The ticket creation process is user-friendly, allowing users to provide detailed descriptions, screenshots, and other relevant information to help support staff understand and address the reported issues effectively.

- **Efficient Ticket Management:** Support staff can manage tickets efficiently through the intuitive support dashboard. They can view, assign, prioritize, and track tickets based on their status and severity, ensuring that critical issues are addressed promptly.

- **Streamlined Ticket Resolution:** Support staff can communicate with users, provide updates, and resolve reported issues directly within the platform. This streamlines the issue resolution process and ensures clear communication between users and support staff throughout the entire process.

- **Real-time Notifications:** Tuso features a real-time notification system that notifies users and support staff of any updates or changes to their tickets. This helps users stay informed about the progress of their reported issues and enables support staff to respond promptly to new tickets and updates.

- **Remote Desktop Protocol (RDP):** Tuso includes an integrated Remote Desktop Protocol (RDP) feature, allowing support staff to establish live connections with users' systems. This enables support staff to diagnose and resolve issues more effectively by accessing users' systems in real-time, providing immediate assistance and troubleshooting.

- **Administrative Features:** Admins have access to administrative features, allowing them to manage users, configure system settings, and monitor system performance. This ensures that the platform operates smoothly and efficiently.

## Table of Contents

1. [Getting Started](#getting_started)
2. [Prerequisites](#prerequisites)
3. [Installation](#Installation)
4. [Usages](#Usages)
5. [About Us](#about)
6. [Team Composition](#team)
7. [Privacy Policy](#privacy)
8. [Terms of Use](#terms)

## Getting Started

<a name="getting_started"></a>
Let's get started with the installation of the project. Follow the steps below to get started with the project.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- **Git:** You need Git to clone the repository. If you don't have it, you can download it from [here](https://git-scm.com/).
- **Node.js:** You need Node.js to run the application. If you don't have it, you can download it from [here](https://nodejs.org/).
- **yarn:** You need yarn to install the project dependencies. If you don't have it, you can install it by running the following command:

```bash
npm install -g yarn
```

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/Excel-Technologies-Ltd/Tuso-Fontend.git
cd Tuso-Fontend
```

2. **Switch to the appropriate branch**

```bash
git switch <branch_name>
```

3. **Install Dependencies:**

```bash
yarn install
```

4. **Create a .env file:**

```bash
touch .env
```

5. **Add the following environment variables to the .env file:**

```bash
VITE_API_URL=https://example.com/Tuso-api
VITE_BASE_URL=https://example.com
```

if you don't want to create a .env file, you can copy the env-example file. To do that, run the following command:

```bash
cp env-example .env
```

**Note:** Replace the values with your own values.

6. **Start the Application:**

```bash
yarn dev
```

7. **Open the Application in Your Browser:**

```bash
http://localhost:5173
```

### Usages

- **Logging in to Tuso:**
  Users need to log in to the Tuso system using their credentials. Here's a basic example of logging in.
  ![Login Page](https://github.com/dev-Anamul/excel-readme-image/blob/main/Screenshot%20from%202024-03-24%2015-21-10.png)

- **Create Issue Ticket:**
  Users can create issue tickets to report system issues they encounter. Here's how it can be done:
  ![Accessing Patient Record](https://github.com/dev-Anamul/excel-readme-image/blob/main/Screenshot%20from%202024-03-24%2015-21-41.png)

- **Follow up on Specific Ticket:**
  Users can follow up on specific tickets to track the progress of the issue resolution. Here's how it can be done:
  ![Prescribing Medication](https://github.com/dev-Anamul/excel-readme-image/blob/main/Screenshot%20from%202024-03-24%2015-26-26.png)

- **Resolve Ticket Through RDP:**
  Support staff can resolve tickets by establishing live connections with users' systems using the Remote Desktop Protocol (RDP) feature. Here's how it can be done:
  ![Performing Laboratory Investigations](https://github.com/dev-Anamul/excel-readme-image/blob/main/Screenshot%20from%202024-03-24%2015-27-09.png)

### About Us

<a name="about"></a>

At Excel Technologies Limited, we are dedicated to revolutionizing healthcare through innovative technology solutions. Our team is comprised of passionate individuals with diverse backgrounds and expertise, working together to develop and maintain Tuso system designed to streamline healthcare data management and improve patient outcomes. We are committed to delivering high-quality, user-friendly solutions that meet the needs of healthcare providers, administrators, and patients. For more information about our company and services, please visit our website at [www.excelbd.com](https://www.excelbd.com).

### Team Composition

<a name="team"></a>

- **Development Team:** Our .NET Core backend API is crafted by a talented team of 8 Software Engineers led by an experienced Team Lead. They are committed to ensuring the robustness, scalability, and security of our system.

- **Frontend Team:** The user interface of Tuso is developed using React by a team of 7 skilled Software Engineers, led by a proactive Team Lead. They focus on creating intuitive interfaces that enhance user experience and efficiency.

- **UI/UX Team:** Our UI/UX Design Team is dedicated to creating visually appealing and user-friendly interfaces for Tuso. Their innovative designs are aimed at optimizing workflow and improving usability for healthcare professionals.

- **Quality Assurance Team:** Ensuring the reliability and quality of Tuso is the responsibility of our SQA Team. Comprising Software Engineers with a keen eye for detail, they rigorously test every aspect of the software to guarantee optimal performance and compliance with industry standards.

- **Personal Touch:** Behind Tuso is a team of passionate individuals driven by a shared vision of leveraging technology to make a positive impact in the healthcare industry. Each team member, from developers to designers to QA analysts, brings unique perspectives and skills to the table, contributing to the success of our project.

  As a cohesive unit, we collaborate closely, leveraging our collective expertise to overcome challenges and deliver a cutting-edge solution that empowers healthcare providers and improves patient care. With a commitment to excellence and a focus on innovation, we are proud to be at the forefront of healthcare technology, making a difference one line of code at a time.

### Privacy Policy

<a name="privacy"></a>

We safeguard personal data collected on Tuso, using it solely for healthcare services and system improvement. Information is shared with authorized personnel and third-party service providers only for system operation. We prioritize data security but cannot guarantee absolute protection. Policy updates will be posted on our website.

### Terms of Use

<a name="terms"></a>

Accessing Tuso implies acceptance of our terms. Use the system lawfully and responsibly, safeguarding account credentials. Intellectual property rights belong to SmartCare Solutions. We are not liable for damages arising from system use. Changes to terms will be immediately effective upon posting.
