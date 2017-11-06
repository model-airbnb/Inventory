const dataGenerator = require('../server/data-generator');
const { expect } = require('chai');

describe('dataGenerator', () => {
  it('data-generator should have methods listingsGenerator, listingsGeneratorImport, availabilityGenerator, and availabilityUpdateGenerator', () => {
    expect(dataGenerator.listingsGenerator).to.be.a('function');
    expect(dataGenerator.listingsGeneratorImport).to.be.a('function');
    expect(dataGenerator.availabilityGenerator).to.be.a('function');
    expect(dataGenerator.availabilityUpdateGenerator).to.be.a('function');
  });

  it('listingsGenerator should generate 10000 listings', () => {
    expect(dataGenerator.listingsGenerator().length).to.equal(10000);
  });

  it('listingsGeneratorImport should generate 5000 listings to write to a file', () => {
    expect(dataGenerator.listingsGeneratorImport().length).to.equal(5000);
  });

  it('availabilityGenerator should generate 10000 available dates', () => {
    expect(dataGenerator.availabilityGenerator().length).to.equal(10000);
  });

  it('availabilityUpdateGenerator should generate 10000 booked dates', () => {
    expect(dataGenerator.availabilityUpdateGenerator().length).to.equal(10000);
  });
});
