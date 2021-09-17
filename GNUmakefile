INPUT_DIR = .
OUTPUT_DIR = output

FONTS_INPUT_FILES = $(wildcard $(INPUT_DIR)/fonts/*.woff2)
FONTS_OUTPUT_FILES = $(FONTS_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

all: build

build: prepare_output_dir build-fonts

build-fonts: $(FONTS_OUTPUT_FILES)

$(OUTPUT_DIR)/fonts/%.woff2: $(INPUT_DIR)/fonts/%.woff2
	cp $< $@

prepare_output_dir:
	@mkdir -p $(OUTPUT_DIR)/fonts

clean:
	$(RM) -r $(OUTPUT_DIR)/*

.PHONY: all build build-fonts prepare_output_dir clean
