# Compomint Website

![Compomint Logo](public/img/icon.png)

A lightweight JavaScript template-based component engine website.

## Overview

This repository contains the website for Compomint - a lightweight JavaScript template-based component engine for web applications. The website demonstrates Compomint's features and provides documentation and examples for developers.

## Features

- **Responsive Design**: Built with Tailwind CSS to provide a fully responsive experience
- **Multi-language Support**: Full i18n support for English, Korean, Japanese, and Chinese
- **Dark Mode**: Integrated light/dark mode toggle
- **Interactive Examples**: Live code examples demonstrating Compomint's capabilities
- **Component Showcase**: Practical examples of components built with Compomint

## Structure

- `/pages`: Main website files
  - `/css`: Stylesheet files
  - `/js`: JavaScript files including templates and language support
  - `/img`: Images and icons
  - `/examples`: Example components and demo code

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/compomint-website.git
   ```

2. Open the website locally:

   ```
   cd compomint-website
   ```

   Then serve the pages directory using any static file server.

3. For development, you can use any simple HTTP server:

   ```
   # Using Python (if installed)
   python -m http.server

   # Or using Node.js (with http-server installed)
   npx http-server
   ```

4. For AI Assistants and Developers:
   To learn about Compomint's coding standards and usage patterns, refer to the guides in the `public/ai-training-data/` directory:
   - [`compomint-coding-guide_type1.md`](public/ai-training-data/compomint-coding-guide_type1.md): Compomint Coding Standards
   - [`compomint-coding-guide-type2.md`](public/ai-training-data/compomint-coding-guide-type2.md): Guide to Converting HTML to Compomint Templates
   - [`compomint-coding-guide-type3.md`](public/ai-training-data/compomint-coding-guide-type3.md): Compomint Quick Reference Guide

5. Contributing and Version Control:
   When making changes to the documentation, templates, or AI training data, ensure you stage your changes before committing:
   ```bash
   # Stage all modified files
   git add .
   
   # Or stage specific files
   git add path/to/file.md
   
   # Commit your staged changes
   git commit -m "Description of your changes"
   ```

## Internationalization

The website supports multiple languages through Compomint's built-in i18n system:

- English (en)
- Korean (ko)
- Japanese (ja)
- Chinese (zh)

Language files are located in `js/language-switcher.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Projects

- [Compomint Core](https://github.com/kurukona/compomint) - The main Compomint JavaScript library

## Contact

For questions or feedback about the website, please open an issue in this repository.
