function fetchEnumSql(enumName) {
    return `SELECT e.enumlabel AS enum_value FROM pg_type t 
        JOIN pg_enum e ON t.oid = e.enumtypid  
        JOIN pg_catalog.pg_namespace n 
        ON n.oid = t.typnamespace AND t.typname='${enumName}';`;
}

module.exports = {
    fetchEnumSql,
};
