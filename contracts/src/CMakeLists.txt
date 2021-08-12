project(mywax)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( mywax mywax mywax.cpp )
target_include_directories( mywax PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( mywax ${CMAKE_SOURCE_DIR}/../ricardian )