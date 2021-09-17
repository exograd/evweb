INPUT_DIR = .
OUTPUT_DIR = output

SASS_OPTIONS = --no-error-css --style compressed
CLOSURE_OPTIONS = --jscomp_off "*"

SUB_DIRS = fonts css images js

FONTS_INPUT_FILES = $(wildcard $(INPUT_DIR)/fonts/*.woff2)
FONTS_OUTPUT_FILES = $(FONTS_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

CSS_INPUT_FILES = $(wildcard $(INPUT_DIR)/css/*.scss)
CSS_OUTPUT_FILES = $(CSS_INPUT_FILES:$(INPUT_DIR)/%.scss=$(OUTPUT_DIR)/%.css)

IMAGES_INPUT_FILES = $(shell find $(INPUT_DIR)/images -name *.png)
IMAGES_OUTPUT_FILES = $(IMAGES_INPUT_FILES:$(INPUT_DIR)/%.png=$(OUTPUT_DIR)/%.png)

JS_INPUT_BUNDLES = $(shell find $(INPUT_DIR)/js -mindepth 1 -maxdepth 1 -type d)
JS_OUTPUT_FILES = $(JS_INPUT_BUNDLES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%.js)

define js_bundle_rule
$(subst $(INPUT_DIR),$(OUTPUT_DIR),$1).js: $(wildcard $1/*.js)
	closure-compiler $(CLOSURE_OPTIONS) \
	    --js $$^ --js_output_file $$@ \
	    --create_source_map %outname%.map && \
	echo "//# sourceMappingURL=$(notdir $$@).map" >>$$@
endef

all: build

build: prepare_output_dir build-fonts build-css build-images build-js

build-fonts: $(FONTS_OUTPUT_FILES)

$(OUTPUT_DIR)/fonts/%.woff2: $(INPUT_DIR)/fonts/%.woff2
	cp $< $@

build-css: $(CSS_OUTPUT_FILES)

$(OUTPUT_DIR)/css/%.css: $(INPUT_DIR)/css/%.scss FORCE
	sass $(SASS_OPTIONS) $<:$@

build-images: $(IMAGES_OUTPUT_FILES)

$(OUTPUT_DIR)/images/%.png: $(INPUT_DIR)/images/%.png
	pngcrush $< $@

build-js: $(JS_OUTPUT_FILES)

$(foreach bundle,$(JS_INPUT_BUNDLES),$(eval $(call js_bundle_rule,$(bundle))))

prepare_output_dir:
	@mkdir -p $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

clean:
	$(RM) -r  $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

FORCE:

.PHONY: all build build-fonts build-css build-images build-js
.PHONY: prepare_output_dir clean
