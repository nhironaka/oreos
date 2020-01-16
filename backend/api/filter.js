const express = require('express');
const path = require('path');
const { get, capitalize } = require('lodash');

const db = require('../db/index');
const { fetchEnumSql } = require('../domain/Filter');
const { readFile } = require('../filters/index');

const router = express.Router();

// Handles url GET:/problems
router.get('/:filterType', async (req, res) => {
  const { filterType } = req.params;

  try {
    const json = await readFile(path.resolve(__dirname, `../filters/domain/${filterType}.json`));
    const queries = [];

    json.forEach((entry, idx) => {
      const dataDriven = get(entry, 'type.properties.data_drive')
      if (dataDriven && dataDriven.source_type === 'database') {
        queries.push([idx, fetchEnumSql(dataDriven.model)])
      }
    });
    if (queries.length) {
      await db.batchQuery(queries.map(q => q[1]), (err, data) => {
        if (err) {
          throw err;
        }
        data.forEach((entry, i) => {
          const filter = json[queries[i][0]];
          filter.type.properties.options = entry.rows.map(row => ({
            id: row.enum_value,
            label: capitalize(row.enum_value),
            type: filter.id,
          }));
        });
        res.status(200).json({
          data: json,
        });
      });
    }

  } catch (e) {
    console.trace(e);
    res.status(400).json({
      error: 'Unable to fetch problem filter',
    })
  }

});

module.exports = router;
