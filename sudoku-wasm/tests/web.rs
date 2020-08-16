//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
extern crate web_sys;
extern crate sudoku_wasm;

use wasm_bindgen_test::*;
use sudoku_wasm::{Difficulty, Grid};

wasm_bindgen_test_configure!(run_in_browser);

fn get_grid(difficulty: &str) -> Grid {
    Grid::new(difficulty)
}

#[wasm_bindgen_test]
fn test_grid_size() {
    let grid = get_grid("easy");
    assert_eq!(grid.get_grid_size(), 9);
    assert_eq!(grid.get_grid_size(), 9);
}

#[wasm_bindgen_test]
fn test_grid_difficulty() {
    let (grid_easy, grid_medium, grid_hard, grid_expert, grid_unknown) = (
        get_grid("easy"),
        get_grid("medium"),
        get_grid("hard"),
        get_grid("expert"),
        get_grid("something"),
    );
    assert_eq!(grid_easy.get_difficulty(), Difficulty::Easy);
    assert_eq!(grid_medium.get_difficulty(), Difficulty::Medium);
    assert_eq!(grid_hard.get_difficulty(), Difficulty::Hard);
    assert_eq!(grid_expert.get_difficulty(), Difficulty::Expert);
    assert_eq!(grid_unknown.get_difficulty(), Difficulty::Easy);
}

#[wasm_bindgen_test]
fn test_empty_grid() {
    let grid = get_grid("easy");
    let blocks = grid.get_blocks();
    unsafe {
        for i in 0..grid.get_grid_size() {
            assert_eq!(*blocks.offset(i as isize), 0);
        }
    }
}

#[wasm_bindgen_test]
fn test_grid_value() {
    let mut grid = get_grid("easy");
    grid.set_block_value(8, 1, 2);
    assert_eq!(grid.get_block_value(1, 2), 8);
    unsafe {
        let blocks = grid.get_blocks();
        assert_eq!(*blocks.offset(11isize), 8);
    }
}

#[wasm_bindgen_test]
fn test_is_grid_in_row() {
    let mut grid = get_grid("easy");
    grid.set_block_value(8, 1, 2);
    for i in 0..9 {
        assert_eq!(grid.is_in_grid_row((1, i, &8)), true);
    }
    assert_eq!(grid.is_in_grid_row((0, 2, &8)), false);
}

#[wasm_bindgen_test]
fn test_is_grid_in_col() {
    let mut grid = get_grid("easy");
    grid.set_block_value(5, 3, 6);
    for i in 0..9 {
        assert_eq!(grid.is_in_grid_col((i, 6, &5)), true);
    }
    assert_eq!(grid.is_in_grid_col((1, 7, &5)), false);
}

#[wasm_bindgen_test]
fn test_is_grid_in_square() {
    let mut grid = get_grid("easy");
    grid.set_block_value(7, 5, 5);
    for i in 3..6 {
        assert_eq!(grid.is_in_grid_square((3, i, &7)), true);
        assert_eq!(grid.is_in_grid_square((4, i, &7)), true);
        assert_eq!(grid.is_in_grid_square((5, i, &7)), true);
    }
    assert_eq!(grid.is_in_grid_square((8, 8, &7)), false);
}

#[wasm_bindgen_test]
fn test_is_grid_full() {
    let mut grid = get_grid("easy");
    let grid_size = grid.get_grid_size();
    assert_eq!(grid.is_grid_full(), false);
    for i in 0..grid_size*grid_size {
        let (row, col) = grid.get_row_col(i);
        grid.set_block_value(1u32, row, col); 
    }
    assert_eq!(grid.is_grid_full(), true);
}

#[wasm_bindgen_test]
fn test_fill_grid() {
    let mut grid = get_grid("easy");
    let blocks = grid.get_blocks();
    let grid_size = grid.get_grid_size();
    grid.fill_grid();
    for i in 0..grid_size * grid_size {
        unsafe {
            let value = *blocks.offset(i as isize);
            assert_eq!(value > 0 && value < 10, true);
        }
    }
}

#[wasm_bindgen_test]
fn test_remove_numbers_from_grid() {
    let mut grid = get_grid("expert");
    grid.fill_grid();
    grid.remove_numbers_from_grid();
    let blocks = grid.get_block_vec();
    let length = blocks.iter().filter(|x| **x == 0).collect::<Vec<&u32>>().len();
    assert_eq!(length, grid.get_removed_blocks_count() as usize);
}


