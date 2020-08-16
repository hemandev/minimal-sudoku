mod utils;

use js_sys::Uint32Array;
use wasm_bindgen::prelude::*;

pub const EMPTY_VALUE: u32 = 0;
pub const GRID_SIZE: usize = 9;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Difficulty {
    Easy = 3,
    Medium = 4,
    Hard = 5,
    Expert = 10,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Grid {
    grid_size: usize,
    blocks: Vec<u32>,
    difficulty: Difficulty,
    counter: u32,
    removed_blocks: u32,
}

#[wasm_bindgen]
impl Grid {
    pub fn new(difficulty: &str) -> Self {
        let grid_size = GRID_SIZE;
        let blocks = Grid::build_empty_grid(grid_size);
        let difficulty = utils::get_difficulty(difficulty);
        Grid {
            grid_size,
            blocks,
            difficulty,
            counter: 0,
            removed_blocks: 0,
        }
    }

    pub fn get_grid_size(&self) -> usize {
        self.grid_size
    }

    pub fn get_removed_blocks_count(&self) -> u32 {
        self.removed_blocks
    }

    pub fn get_block_value(&self, row: usize, col: usize) -> u32 {
        utils::get_block_value(&self.blocks, self.grid_size, row, col)
    }

    pub fn get_blocks(&self) -> *const u32 {
        self.blocks.as_ptr()
    }

    pub fn get_blocks_array(&self) -> Uint32Array {
        unsafe { Uint32Array::view(&self.blocks) }
    }

    pub fn get_index(&self, row: usize, col: usize) -> usize {
        utils::get_index(self.grid_size, row, col)
    }

    pub fn get_difficulty(&self) -> Difficulty {
        self.difficulty
    }

    pub fn set_difficulty(&mut self, difficulty: &str) {
        self.difficulty = utils::get_difficulty(difficulty);
    }

    pub fn solve(&mut self) {
        self.fill_grid();
    }

    pub fn generate_puzzle(&mut self) {
        self.remove_numbers_from_grid();
    }

    pub fn clear(&mut self) {
        self.clear_grid();
        self.counter = 0;
        self.removed_blocks = 0;
    }
}

impl Grid {
    pub fn build_empty_grid(grid_size: usize) -> Vec<u32> {
        utils::generate_empty_blocks(grid_size * grid_size)
    }

    pub fn get_block_vec(&self) -> &Vec<u32> {
        &self.blocks
    }

    pub fn clear_grid(&mut self) {
        self.blocks = utils::generate_empty_blocks(self.grid_size * self.grid_size);
    }

    pub fn set_block_value(&mut self, value: u32, row: usize, col: usize) {
        let index = self.get_index(row, col);
        self.blocks[index] = value;
    }

    pub fn get_row_col(&self, index: usize) -> (usize, usize) {
        (index / self.grid_size, index % self.grid_size)
    }

    pub fn identify_working_square(&self, (row, col): (usize, usize)) -> Vec<u32> {
        utils::identify_working_square(&self.blocks, (row, col), self.grid_size)
    }

    pub fn is_in_grid_row(&self, (row, col, value): (usize, usize, &u32)) -> bool {
        utils::is_in_grid_row(&self.blocks, (row, col, self.grid_size, value))
    }

    pub fn is_in_grid_col(&self, (row, col, value): (usize, usize, &u32)) -> bool {
        utils::is_in_grid_col(&self.blocks, (row, col, self.grid_size, value))
    }

    pub fn is_in_grid_square(&self, (row, col, value): (usize, usize, &u32)) -> bool {
        utils::is_in_grid_square(&self.blocks, (row, col, self.grid_size, value))
    }

    pub fn is_valid_insert(&self, (row, col, value): (usize, usize, &u32)) -> bool {
        utils::is_valid_insert(&self.blocks, (row, col, self.grid_size, value))
    }

    pub fn find_empty_index(&self) -> Option<usize> {
        utils::find_empty_index(&self.blocks)
    }

    pub fn is_grid_full(&self) -> bool {
        utils::is_grid_full(&self.blocks)
    }

    pub fn fill_grid(&mut self) -> bool {
        let mut numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let index = match self.find_empty_index() {
            Some(i) => i,
            None => return true,
        };
        let (row, col) = self.get_row_col(index);
        utils::shuffle(&mut numbers);
        for value in numbers.iter() {
            let args = (row, col, value);
            if self.is_valid_insert(args) {
                self.blocks[index] = *value;
                if self.fill_grid() {
                    return true;
                }
                self.blocks[index] = EMPTY_VALUE;
            }
        }
        false
    }

    pub fn remove_numbers_from_grid(&mut self) {
        let mut attempts = self.difficulty as u8;
        while attempts > 0 {
            let mut index = utils::rng((GRID_SIZE * GRID_SIZE) as u32) as usize;
            while self.blocks[index] == 0 {
                index = utils::rng((GRID_SIZE * GRID_SIZE) as u32) as usize;
            }
            let backup = self.blocks[index];
            self.blocks[index] = EMPTY_VALUE;

            let mut grid_copy = utils::copy_grid(&self.blocks);

            self.counter = 0;
            self.solve_grid(&mut grid_copy);
            if self.counter != 1 {
                self.blocks[index] = backup;
                attempts -= 1;
            } else {
                self.removed_blocks += 1;
            }
        }
    }

    pub fn solve_grid(&mut self, grid: &mut Vec<u32>) -> bool {
        let index = match utils::find_empty_index(grid) {
            Some(i) => i,
            None => {
                self.counter += 1;
                return false;
            }
        };
        let (row, col) = self.get_row_col(index);
        for value in 1..=9 {
            if self.counter < 2 {
                let args = (row, col, GRID_SIZE, &value);
                if utils::is_valid_insert(grid, args) {
                    grid[index] = value;
                    if self.solve_grid(grid) {
                        return true;
                    }
                    grid[index] = EMPTY_VALUE;
                }
            }
        }
        false
    }
}
