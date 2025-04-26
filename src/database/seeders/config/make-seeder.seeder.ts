const fs = require('fs');
const path = require('path');

const className = process.argv[2];

if (!className) {
  console.error('Please provide a class name');
  process.exit(1);
}

const directory = path.join(__dirname, '../');

const seederContent = `
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class ${className} implements Seeder {
  constructor() {}

  async seed(): Promise<any> {
    // Generate and insert  data
  }

  async drop(): Promise<any> {
    // Drop data
  }
}`;

const fileName = `${className.toLowerCase()}.seeder.ts`;
const filePath = path.join(directory, fileName);
filePath;
fs.writeFile(filePath, seederContent, (err) => {
  if (err) {
    console.error('Error creating seeder file:', err);
  } else {
    console.log(`Seeder file "${filePath}" created successfully!`);
  }
});
