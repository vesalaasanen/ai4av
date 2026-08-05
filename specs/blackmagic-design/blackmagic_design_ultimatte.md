---
spec_id: admin/blackmagic-design-ultimatte-12
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blackmagic Design Ultimatte 12 Control Spec"
manufacturer: "Blackmagic Design"
model_family: "Ultimatte 12"
aliases: []
compatible_with:
  manufacturers:
    - "Blackmagic Design"
  models:
    - "Ultimatte 12"
    - "Ultimatte 12 8K"
    - "Ultimatte 12 HD Mini"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - "https://documents.blackmagicdesign.com/UserManuals/UltimatteManual.pdf?_v=1772697610000"
retrieved_at: 2026-07-24T18:50:09.756Z
last_checked_at: 2026-08-05T08:13:53.123Z
generated_at: 2026-08-05T08:13:53.123Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility range not stated"
  - "ports 9996 and 9977 mentioned for other software but their control protocol is not documented here"
  - "field list for the general NETWORK block not shown in source"
  - "MESSAGE block field format not documented in source"
  - "max is video-format dependent"
  - "no multi-step macro sequences explicitly documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "protocol version not stated — source references \"protocol 2.0\" and \"version 1.2\" in notes but does not state the current version"
  - "error/block format for rejected commands not documented beyond ACK"
  - "\"Message block\" mentioned as possible response to file/GPI commands but format not documented"
  - "maximum number of simultaneous TCP connections not stated"
  - "CAMERA CONTROL mode values not enumerated beyond \"idle\""
  - "general NETWORK block field list not shown in source (only NETWORK INTERFACE block fields shown)"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:13:53.123Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions match source block syntax verbatim; transport port 9998 confirmed; all status blocks represented in Feedbacks. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Blackmagic Design Ultimatte 12 Control Spec

## Summary

The Blackmagic Design Ultimatte 12 is a real-time compositing / keying processor supporting blue/green screen removal with advanced matte, spill, flare, and lighting controls. This spec covers the text-based Ethernet control protocol (TCP port 9998), which supports reading and setting all device parameters, file management (load/save/delete/rename), GPI event list management, frame buffer assignment, and camera control. Models include Ultimatte 12, Ultimatte 12 8K, and Ultimatte 12 HD Mini (feature subsets apply).

<!-- UNRESOLVED: exact firmware version compatibility range not stated -->
<!-- UNRESOLVED: ports 9996 and 9977 mentioned for other software but their control protocol is not documented here -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9998
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: status resend supported by sending block header + blank line
- levelable  # inferred: extensive numeric controls with defined ranges
```

## Actions
```yaml
# Command payloads are text blocks: a header in CAPS + colon, key:value lines,
# terminated by a blank line (double newline). Newlines shown as \n in templates.
# The trailing blank-line terminator (extra \n) is implied per protocol.

# File Operations
- id: file_load
  label: Load File
  kind: action
  command: "FILE:\nLoad: {filename}\n"
  params:
    - name: filename
      type: string
      description: Name of setup file to load

- id: file_save
  label: Save File
  kind: action
  command: "FILE:\nSave: {filename}\n"
  params:
    - name: filename
      type: string
      description: Name to save the setup file as

- id: file_delete
  label: Delete File
  kind: action
  command: "FILE:\nDelete: {filename}\n"
  params:
    - name: filename
      type: string
      description: Name of setup file to delete

- id: file_rename
  label: Rename File
  kind: action
  command: "FILE:\nRename: {filename}\nTo: {to}\n"
  params:
    - name: filename
      type: string
      description: Current filename
    - name: to
      type: string
      description: New filename

# GPI Event List Operations
- id: gpi_insert_event
  label: Insert GPI Event
  kind: action
  command: "GPI:\nID: {id}\nInsert: {filename}\nAt: {at}\n"
  params:
    - name: id
      type: integer
      description: GPI input number (1-5)
    - name: filename
      type: string
      description: Setup file to insert
    - name: at
      type: integer
      description: "Insertion index (-1 = end of list)"

- id: gpi_remove_event
  label: Remove GPI Event
  kind: action
  command: "GPI:\nID: {id}\nRemove: {index}\n"
  params:
    - name: id
      type: integer
      description: GPI input number (1-5)
    - name: index
      type: integer
      description: "Event index to remove (0 = delete all events)"

# Frame Buffer
- id: frame_buffer_assign
  label: Assign Frame Buffer Image
  kind: action
  command: "FRAME BUFFER:\n{buffer}: {image_filename}\n"
  params:
    - name: buffer
      type: string
      description: "Frame buffer name (e.g. Background 1, Background 2, Layer 1, Layer 2, Garbage Matte, Holdout Matte)"
    - name: image_filename
      type: string
      description: Pre-loaded image filename from Media Pool

# Action Controls (send "Yes" to execute; device replies "Yes" when complete)
- id: factory_defaults
  label: Factory Defaults
  kind: action
  command: "CONTROL:\nFactory Defaults: Yes\n"
  params: []

- id: user_defaults
  label: User Defaults
  kind: action
  command: "CONTROL:\nUser Defaults: Yes\n"
  params: []

- id: auto_screen_sample
  label: Auto Screen Sample
  kind: action
  command: "CONTROL:\nAuto Screen Sample: Yes\n"
  params: []

- id: screen_capture
  label: Screen Capture
  kind: action
  command: "CONTROL:\nScreen Capture: Yes\n"
  params: []

- id: noise_select
  label: Noise Select
  kind: action
  command: "CONTROL:\nNoise Select: Yes\n"
  params: []

- id: sample_wall
  label: Sample Wall
  kind: action
  command: "CONTROL:\nSample Wall: Yes\n"
  params: []

- id: sample_floor
  label: Sample Floor
  kind: action
  command: "CONTROL:\nSample Floor: Yes\n"
  params: []

- id: matte_reset
  label: Matte Reset
  kind: action
  command: "CONTROL:\nMatte Reset: Yes\n"
  params: []

- id: cleanup_reset
  label: Cleanup Reset
  kind: action
  command: "CONTROL:\nCleanup Reset: Yes\n"
  params: []

- id: gm_cleanup_reset
  label: GM Cleanup Reset
  kind: action
  command: "CONTROL:\nGM Cleanup Reset: Yes\n"
  params: []

- id: fg_color_reset
  label: FG Color Reset
  kind: action
  command: "CONTROL:\nFG Color Reset: Yes\n"
  params: []

- id: bg_color_reset
  label: BG Color Reset
  kind: action
  command: "CONTROL:\nBG Color Reset: Yes\n"
  params: []

- id: flare_reset
  label: Flare Reset
  kind: action
  command: "CONTROL:\nFlare Reset: Yes\n"
  params: []

- id: ambiance_reset
  label: Ambiance Reset
  kind: action
  command: "CONTROL:\nAmbiance Reset: Yes\n"
  params: []

- id: bg_test_signal_color_reset
  label: BG Test Signal Color Reset
  kind: action
  command: "CONTROL:\nBG Test Signal Color Reset: Yes\n"
  params: []

- id: ly_color_reset
  label: LY Color Reset
  kind: action
  command: "CONTROL:\nLY Color Reset: Yes\n"
  params: []

- id: ly_test_signal_color_reset
  label: LY Test Signal Color Reset
  kind: action
  command: "CONTROL:\nLY Test Signal Color Reset: Yes\n"
  params: []

- id: window_reset
  label: Window Reset
  kind: action
  command: "CONTROL:\nWindow Reset: Yes\n"
  params: []

- id: window_skew_reset
  label: Window Skew Reset
  kind: action
  command: "CONTROL:\nWindow Skew Reset: Yes\n"
  params: []

- id: gp_out_trigger
  label: Trigger GPI Output
  kind: action
  command: "CONTROL:\nGP Out: Yes\n"
  params: []

# Generic control set (covers all numeric, on/off, and enumerated controls)
- id: set_control
  label: Set Control Value
  kind: action
  command: "{block}:\n{control}: {value}\n"
  params:
    - name: block
      type: string
      description: "Block header (e.g. CONTROL)"
    - name: control
      type: string
      description: "Control name verbatim from Controls Reference (e.g. Matte Density)"
    - name: value
      type: string
      description: "Value to set, or relative delta (e.g. +10 / -5). Boolean controls take On/Off; enums take the literal enum string."

# Camera Control (CAMERA CONTROL block - distinct block documented in its own section)
- id: set_camera_control
  label: Set Camera Control
  kind: action
  command: "CAMERA CONTROL:\n{field}: {value}\n"
  params:
    - name: field
      type: string
      description: "Camera control field (CCU Camera Id, CEC Camera Id, Camera Control Mode)"
    - name: value
      type: string
      description: "Value for the field (e.g. CCU Camera Id integer)"

- id: request_status
  label: Request Status Resend
  kind: action
  command: "{block}:\n"
  params:
    - name: block
      type: string
      description: "Block header to request (e.g. CONTROL, IDENTITY, DEVICE)"
```

## Feedbacks
```yaml
# Status blocks received from device
- id: identity
  type: block
  description: "IDENTITY block: Model, Label, Unique ID"

- id: network_general
  type: block
  description: "NETWORK block: general network information"
  # UNRESOLVED: field list for the general NETWORK block not shown in source

- id: network_interface
  type: block
  description: "NETWORK INTERFACE block: Name, Priority, MAC Address, IP config (DynamicIP, Current/Static Addresses, Gateway, DNS Servers)"

- id: version
  type: block
  description: "VERSION block: Product ID, Hardware Version, Software Version, Software Release"

- id: device
  type: block
  description: "DEVICE block: Video Format, Reference Source, input lock statuses (FG/BG/MONITOR/G MATTE/H MATTE/REF/BG MATTE/LAYER/LAYER MATTE In)"

- id: video_formats
  type: block
  description: "VIDEO FORMATS block: list of supported video formats"

- id: control_values
  type: block
  description: "CONTROL block: all current control parameter values"

- id: control_defaults
  type: block
  description: "CONTROL DEFAULT block: default control parameter values"

- id: current_file
  type: block
  description: "CURRENT FILE block: Name and Status of loaded file"

- id: file_list
  type: block
  description: "FILE LIST block: list of stored setup files"

- id: gpi_list
  type: block
  description: "GPI LIST block: GPI event list per input (ID, Index, files)"

- id: image_list
  type: block
  description: "IMAGE LIST block: stored image filenames, capacity, available space"

- id: frame_buffer
  type: block
  description: "FRAME BUFFER block: frame buffer assignments (Background 1/2, Layer 1/2, Garbage Matte, Holdout Matte), Background/Layer Mix, Background/Layer Transition Duration"

- id: camera_control
  type: block
  description: "CAMERA CONTROL block: CCU Camera Id, CEC Camera Id, Camera Control Mode"

- id: message
  type: block
  description: "MESSAGE block: returned in place of status block on certain file/GPI command outcomes"
  # UNRESOLVED: MESSAGE block field format not documented in source

- id: ack
  type: enum
  values: [ACK]
  description: Acknowledgement sent after each command; followed by status update block
```

## Variables
```yaml
# Numeric controls (range 0-10000 unless noted)
- id: matte_density
  type: integer
  min: 0
  max: 10000

- id: black_gloss
  type: integer
  min: 0
  max: 10000

- id: blue_density
  type: integer
  min: 0
  max: 10000

- id: green_density
  type: integer
  min: 0
  max: 10000

- id: red_density
  type: integer
  min: 0
  max: 10000

- id: shadow_level
  type: integer
  min: 0
  max: 10000

- id: shadow_threshold
  type: integer
  min: 0
  max: 10000

- id: matte_correct_horizontal_size
  type: integer
  min: 0
  max: 6

- id: matte_correct_vertical_size
  type: integer
  min: 0
  max: 3

- id: cursor_x
  type: integer
  min: 0
  max: 10000

- id: cursor_y
  type: integer
  min: 0
  max: 10000

- id: cursor_2_x
  type: integer
  min: 0
  max: 10000

- id: cursor_2_y
  type: integer
  min: 0
  max: 10000

- id: veil_master
  type: integer
  min: 0
  max: 10000

- id: veil_red
  type: integer
  min: 0
  max: 10000

- id: veil_green
  type: integer
  min: 0
  max: 10000

- id: veil_blue
  type: integer
  min: 0
  max: 10000

- id: veil_correct_horizontal_size
  type: integer
  min: 0
  max: 6

- id: veil_correct_vertical_size
  type: integer
  min: 0
  max: 6  # device-dependent: 0-6 on Ultimatte 12 8K (protocol 2.0), 0-3 on Ultimatte 12 (version 1.2)

- id: wall_color_red
  type: integer
  min: 0
  max: 10000

- id: wall_color_green
  type: integer
  min: 0
  max: 10000

- id: wall_color_blue
  type: integer
  min: 0
  max: 10000

- id: floor_color_red
  type: integer
  min: 0
  max: 10000

- id: floor_color_green
  type: integer
  min: 0
  max: 10000

- id: floor_color_blue
  type: integer
  min: 0
  max: 10000

- id: cleanup_level
  type: integer
  min: 0
  max: 10000

- id: cleanup_dark_recover
  type: integer
  min: 0
  max: 10000

- id: cleanup_light_recover
  type: integer
  min: 0
  max: 10000

- id: cleanup_strength
  type: integer
  min: 0
  max: 10000

- id: gm_cleanup_level
  type: integer
  min: 0
  max: 10000

- id: gm_cleanup_dark_recover
  type: integer
  min: 0
  max: 10000

- id: gm_cleanup_light_recover
  type: integer
  min: 0
  max: 10000

- id: gm_cleanup_strength
  type: integer
  min: 0
  max: 10000

- id: correction_level
  type: integer
  min: 0
  max: 10000

- id: noise_level
  type: integer
  min: 0
  max: 10000

- id: black_balance
  type: integer
  min: 0
  max: 10000

- id: gray_balance
  type: integer
  min: 0
  max: 10000

- id: white_balance
  type: integer
  min: 0
  max: 10000

- id: flare_level
  type: integer
  min: 0
  max: 10000

- id: cool
  type: integer
  min: 0
  max: 10000

- id: skin_tone
  type: integer
  min: 0
  max: 10000

- id: light_warm
  type: integer
  min: 0
  max: 10000

- id: dark_warm
  type: integer
  min: 0
  max: 10000

- id: flare_correct_horizontal_size
  type: integer
  min: 0
  max: 6

- id: flare_correct_vertical_size
  type: integer
  min: 0
  max: 6  # device-dependent: 0-6 on Ultimatte 12 8K (protocol 2.0), 0-3 on Ultimatte 12 (version 1.2)

- id: ambiance_master
  type: integer
  min: 0
  max: 10000

- id: ambiance_red
  type: integer
  min: 0
  max: 10000

- id: ambiance_green
  type: integer
  min: 0
  max: 10000

- id: ambiance_blue
  type: integer
  min: 0
  max: 10000

- id: ambiance_strength
  type: integer
  min: 0
  max: 10000

- id: direct_light_red
  type: integer
  min: 0
  max: 10000

- id: direct_light_green
  type: integer
  min: 0
  max: 10000

- id: direct_light_blue
  type: integer
  min: 0
  max: 10000

- id: direct_light_mix
  type: integer
  min: 0
  max: 10000

- id: vertical_blur
  type: integer
  min: 0
  max: 10000

- id: fg_saturation_red
  type: integer
  min: 0
  max: 10000

- id: fg_saturation_green
  type: integer
  min: 0
  max: 10000

- id: fg_saturation_blue
  type: integer
  min: 0
  max: 10000

- id: fg_saturation_master
  type: integer
  min: 0
  max: 10000

- id: fg_contrast_red
  type: integer
  min: 0
  max: 10000

- id: fg_contrast_green
  type: integer
  min: 0
  max: 10000

- id: fg_contrast_blue
  type: integer
  min: 0
  max: 10000

- id: fg_contrast_master
  type: integer
  min: 0
  max: 10000

- id: fg_black_red
  type: integer
  min: 0
  max: 10000

- id: fg_black_green
  type: integer
  min: 0
  max: 10000

- id: fg_black_blue
  type: integer
  min: 0
  max: 10000

- id: fg_black_master
  type: integer
  min: 0
  max: 10000

- id: fg_white_red
  type: integer
  min: 0
  max: 10000

- id: fg_white_green
  type: integer
  min: 0
  max: 10000

- id: fg_white_blue
  type: integer
  min: 0
  max: 10000

- id: fg_white_master
  type: integer
  min: 0
  max: 10000

- id: fg_contrast_crossover
  type: integer
  min: 0
  max: 10000

- id: fade_mix
  type: integer
  min: 0
  max: 10000

- id: bg_saturation_red
  type: integer
  min: 0
  max: 10000

- id: bg_saturation_green
  type: integer
  min: 0
  max: 10000

- id: bg_saturation_blue
  type: integer
  min: 0
  max: 10000

- id: bg_saturation_master
  type: integer
  min: 0
  max: 10000

- id: bg_contrast_red
  type: integer
  min: 0
  max: 10000

- id: bg_contrast_green
  type: integer
  min: 0
  max: 10000

- id: bg_contrast_blue
  type: integer
  min: 0
  max: 10000

- id: bg_contrast_master
  type: integer
  min: 0
  max: 10000

- id: bg_black_red
  type: integer
  min: 0
  max: 10000

- id: bg_black_green
  type: integer
  min: 0
  max: 10000

- id: bg_black_blue
  type: integer
  min: 0
  max: 10000

- id: bg_black_master
  type: integer
  min: 0
  max: 10000

- id: bg_white_red
  type: integer
  min: 0
  max: 10000

- id: bg_white_green
  type: integer
  min: 0
  max: 10000

- id: bg_white_blue
  type: integer
  min: 0
  max: 10000

- id: bg_white_master
  type: integer
  min: 0
  max: 10000

- id: bg_contrast_crossover
  type: integer
  min: 0
  max: 10000

- id: bg_filter
  type: integer
  min: 0
  max: 10000

- id: test_signal_master
  type: integer
  min: 0
  max: 10000

- id: test_signal_red
  type: integer
  min: 0
  max: 10000

- id: test_signal_green
  type: integer
  min: 0
  max: 10000

- id: test_signal_blue
  type: integer
  min: 0
  max: 10000

- id: ly_saturation_red
  type: integer
  min: 0
  max: 10000

- id: ly_saturation_green
  type: integer
  min: 0
  max: 10000

- id: ly_saturation_blue
  type: integer
  min: 0
  max: 10000

- id: ly_saturation_master
  type: integer
  min: 0
  max: 10000

- id: ly_contrast_red
  type: integer
  min: 0
  max: 10000

- id: ly_contrast_green
  type: integer
  min: 0
  max: 10000

- id: ly_contrast_blue
  type: integer
  min: 0
  max: 10000

- id: ly_contrast_master
  type: integer
  min: 0
  max: 10000

- id: ly_black_red
  type: integer
  min: 0
  max: 10000

- id: ly_black_green
  type: integer
  min: 0
  max: 10000

- id: ly_black_blue
  type: integer
  min: 0
  max: 10000

- id: ly_black_master
  type: integer
  min: 0
  max: 10000

- id: ly_white_red
  type: integer
  min: 0
  max: 10000

- id: ly_white_green
  type: integer
  min: 0
  max: 10000

- id: ly_white_blue
  type: integer
  min: 0
  max: 10000

- id: ly_white_master
  type: integer
  min: 0
  max: 10000

- id: ly_contrast_crossover
  type: integer
  min: 0
  max: 10000

- id: ly_filter
  type: integer
  min: 0
  max: 10000

- id: ly_test_signal_master
  type: integer
  min: 0
  max: 10000

- id: ly_test_signal_red
  type: integer
  min: 0
  max: 10000

- id: ly_test_signal_green
  type: integer
  min: 0
  max: 10000

- id: ly_test_signal_blue
  type: integer
  min: 0
  max: 10000

- id: ly_fade_mix
  type: integer
  min: 0
  max: 10000

- id: lighting_level_red
  type: integer
  min: 0
  max: 10000

- id: lighting_level_green
  type: integer
  min: 0
  max: 10000

- id: lighting_level_blue
  type: integer
  min: 0
  max: 10000

- id: lighting_level_master
  type: integer
  min: 0
  max: 10000

- id: lighting_minimum_level
  type: integer
  min: 0
  max: 10000

- id: window_position_top
  type: integer
  min: 0
  max: null  # UNRESOLVED: max is video-format dependent

- id: window_position_bottom
  type: integer
  min: 0
  max: null  # UNRESOLVED: max is video-format dependent

- id: window_position_left
  type: integer
  min: 0
  max: null  # UNRESOLVED: max is video-format dependent

- id: window_position_right
  type: integer
  min: 0
  max: null  # UNRESOLVED: max is video-format dependent

- id: window_softness_top
  type: integer
  min: 0
  max: 10000

- id: window_softness_bottom
  type: integer
  min: 0
  max: 10000

- id: window_softness_left
  type: integer
  min: 0
  max: 10000

- id: window_softness_right
  type: integer
  min: 0
  max: 10000

- id: window_skew_top
  type: integer
  min: 0
  max: 10000

- id: window_skew_bottom
  type: integer
  min: 0
  max: 10000

- id: window_skew_left
  type: integer
  min: 0
  max: 10000

- id: window_skew_right
  type: integer
  min: 0
  max: 10000

- id: window_skew_offset_top
  type: integer
  min: 0
  max: 10000

- id: window_skew_offset_bottom
  type: integer
  min: 0
  max: 10000

- id: window_skew_offset_left
  type: integer
  min: 0
  max: 10000

- id: window_skew_offset_right
  type: integer
  min: 0
  max: 10000

- id: transition_rate
  type: integer
  min: 1
  max: 120

- id: bm_process_horizontal
  type: integer
  min: 0
  max: 3

- id: bm_process_vertical
  type: integer
  min: 0
  max: 3

- id: bm_filter
  type: integer
  min: 0
  max: 10000

- id: bm_input_level
  type: integer
  min: 0
  max: 10000

- id: bm_input_offset
  type: integer
  min: 0
  max: 10000

- id: gm_process_horizontal
  type: integer
  min: 0
  max: 3

- id: gm_process_vertical
  type: integer
  min: 0
  max: 3

- id: gm_filter
  type: integer
  min: 0
  max: 10000

- id: gm_input_level
  type: integer
  min: 0
  max: 10000

- id: gm_input_offset
  type: integer
  min: 0
  max: 10000

- id: hm_process_horizontal
  type: integer
  min: 0
  max: 3

- id: hm_process_vertical
  type: integer
  min: 0
  max: 3

- id: hm_filter
  type: integer
  min: 0
  max: 10000

- id: hm_input_level
  type: integer
  min: 0
  max: 10000

- id: hm_input_offset
  type: integer
  min: 0
  max: 10000

- id: lm_process_horizontal
  type: integer
  min: 0
  max: 3

- id: lm_process_vertical
  type: integer
  min: 0
  max: 3

- id: lm_filter
  type: integer
  min: 0
  max: 10000

- id: lm_input_level
  type: integer
  min: 0
  max: 10000

- id: lm_input_offset
  type: integer
  min: 0
  max: 10000

- id: noise_cursor_x
  type: integer
  min: 0
  max: 10000

- id: noise_cursor_y
  type: integer
  min: 0
  max: 10000

- id: fg_input_frame_delay
  type: integer
  min: 0
  max: 14

- id: fg_input_u_position
  type: integer
  min: 0
  max: 10000

- id: fg_input_v_position
  type: integer
  min: 0
  max: 10000

- id: fg_input_uv_position
  type: integer
  min: 0
  max: 10000

- id: talent_highlight_level
  type: integer
  min: 0
  max: 10000

- id: monitor_highlight_level
  type: integer
  min: 0
  max: 10000

- id: matte_out_level
  type: integer
  min: 0
  max: 10000

- id: output_offset
  type: integer
  min: -1500
  max: 1500

- id: gp_out_delay
  type: integer
  min: 1
  max: 120

- id: gp_1_input_delay
  type: integer
  min: 1
  max: 120

- id: gp_2_input_delay
  type: integer
  min: 1
  max: 120

- id: gp_3_input_delay
  type: integer
  min: 1
  max: 120

- id: gp_4_input_delay
  type: integer
  min: 1
  max: 120

- id: gp_5_input_delay
  type: integer
  min: 1
  max: 120

# On/Off Controls
- id: matte_enable
  type: boolean

- id: screen_correct
  type: boolean

- id: gm_cleanup_enable
  type: boolean

- id: noise_enable
  type: boolean

- id: noise_cursor_enable
  type: boolean

- id: fg_freeze
  type: boolean

- id: fg_advanced_contrast_enable
  type: boolean

- id: advanced_flare_enable
  type: boolean

- id: hm_flare_enable
  type: boolean

- id: ambiance_enable
  type: boolean

- id: bg_gradient_enable
  type: boolean

- id: bg_freeze
  type: boolean

- id: bg_advanced_contrast_enable
  type: boolean

- id: bg_test_signal_enable
  type: boolean

- id: ly_input_enable
  type: boolean

- id: ly_advanced_contrast_enable
  type: boolean

- id: ly_freeze
  type: boolean

- id: ly_test_signal_enable
  type: boolean

- id: lighting_enable
  type: boolean

- id: window_enable
  type: boolean

- id: window_bm_enable
  type: boolean

- id: window_gm_enable
  type: boolean

- id: window_hm_enable
  type: boolean

- id: window_lm_enable
  type: boolean

- id: window_invert
  type: boolean

- id: wall_cursor_position_enable
  type: boolean

- id: floor_cursor_position_enable
  type: boolean

- id: dual_cursor
  type: boolean

- id: manual_color_enable
  type: boolean

- id: custom_powerup
  type: boolean
  deprecated: true  # source marks "Custom Powerup(deprecated)"

- id: bm_enable
  type: boolean

- id: bm_invert
  type: boolean

- id: bm_process_invert
  type: boolean

- id: bm_freeze
  type: boolean

- id: gm_enable
  type: boolean

- id: gm_invert
  type: boolean

- id: gm_process_invert
  type: boolean

- id: gm_freeze
  type: boolean

- id: hm_enable
  type: boolean

- id: hm_invert
  type: boolean

- id: hm_process_invert
  type: boolean

- id: hm_freeze
  type: boolean

- id: lm_invert
  type: boolean

- id: lm_process_invert
  type: boolean

- id: monitor_to_program
  type: boolean

- id: monitor_to_talent
  type: boolean

- id: fill_linear_mix_correction
  type: boolean

- id: talent_mirror
  type: boolean

- id: monitor_cascade
  type: boolean

- id: matte_out_invert
  type: boolean

- id: on_air_enable
  type: boolean

- id: on_air_lockout
  type: boolean

- id: matte_view_range
  type: boolean

- id: matte_view_invert
  type: boolean

- id: monitor_out_rgb
  type: boolean

- id: monitor_out_red_only
  type: boolean

- id: monitor_out_green_only
  type: boolean

- id: monitor_out_blue_only
  type: boolean

- id: gp_out_save
  type: boolean

- id: quickload_1
  type: boolean

- id: quickload_2
  type: boolean

- id: quickload_3
  type: boolean

- id: quickload_4
  type: boolean

- id: quickload_5
  type: boolean

- id: quicksave_1
  type: boolean

- id: quicksave_2
  type: boolean

- id: quicksave_3
  type: boolean

- id: quicksave_4
  type: boolean

- id: quicksave_5
  type: boolean

- id: gp_1_input_enable
  type: boolean

- id: gp_2_input_enable
  type: boolean

- id: gp_3_input_enable
  type: boolean

- id: gp_4_input_enable
  type: boolean

- id: gp_5_input_enable
  type: boolean

- id: gp_1_high_enable
  type: boolean

- id: gp_2_high_enable
  type: boolean

- id: gp_3_high_enable
  type: boolean

- id: gp_4_high_enable
  type: boolean

- id: gp_5_high_enable
  type: boolean

- id: tally_active
  type: boolean
  access: read_only

# Enumerated Controls
- id: sdi_3g_level
  type: enum
  values: [A, B]

- id: color_space
  type: enum
  values: ["Rec.709", "Rec.2020"]

- id: filter_mode
  type: enum
  values: [Median, Average]

- id: filter_median
  type: enum
  values: ["0", "1", "2", "3", "4"]

- id: filter_average
  type: enum
  values: ["0", "1", "2", "3", "4"]

- id: ly_in_mix_mode
  type: enum
  values: [Realistic, Linear, Additive]

- id: backing_color
  type: enum
  values: [Red, Green, Blue]

- id: gp_out_level
  type: enum
  values: [High, Low]

- id: output_range
  type: enum
  values: [Normal, Full]

- id: monitor_out
  type: enum
  values: [Program, FG, BG, "Combined Matte", "Internal Matte", Fill, "Layer In", "Background Matte In", "Garbage Matte In", "Holdout Matte In", "Layer Matte In", "Processed LM", "Processed HM", "Processed GM", "Processed BM", "Screen Correction"]

- id: layer_order
  type: enum
  values: ["FG/Layer/BG Layer/BG", "Layer/FG/BG Layer/BG", "Layer/BG Layer/FG/BG", "BG Layer/Layer/FG/BG", "BG Layer/FG/Layer/BG", "FG/BG Layer/Layer/BG", "FG/BG Layer/BG", "BG Layer/FG/BG", "FG/Layer/BG", "Layer/FG/BG"]

- id: video_format
  type: enum
  values: ["Auto Detect", "525i59.94 NTSC 4:3", "625i50 PAL 4:3", "720p60", "720p59.94", "720p50", "1080i60", "1080i59.94", "1080i50", "1080p60", "1080p59.94", "1080p50", "1080p30", "1080p29.97", "1080p25", "1080p24", "1080p23.98", "1080PsF30", "1080PsF29.97", "1080PsF25", "1080PsF24", "1080PsF23.98", "2160p60", "2160p59.94", "2160p50", "2160p30", "2160p29.97", "2160p25", "2160p24", "2160p23.98", "4320p60", "4320p59.94", "4320p50", "4320p30", "4320p29.97", "4320p25", "4320p24", "4320p23.98"]

- id: input_source
  type: enum
  values: [SDI, IP2110]

- id: output_enable
  type: enum
  values: ["On", "Off"]

# Camera Control
- id: ccu_camera_id
  type: integer

- id: cec_camera_id
  type: integer

- id: camera_control_mode
  type: string
```

## Events
```yaml
- id: initial_status
  description: >-
    Upon connection, the device sends a complete status update consisting of all
    status blocks (IDENTITY, NETWORK, NETWORK INTERFACE, VERSION, DEVICE, VIDEO
    FORMATS, CONTROL, CONTROL DEFAULT, CURRENT FILE, FILE LIST, GPI LIST, IMAGE
    LIST, FRAME BUFFER, CAMERA CONTROL).

- id: status_change
  description: >-
    After initial connection, the device sends status blocks to all connected
    clients whenever any control value changes, regardless of the change source
    (front panel, network client, etc.). Blocks contain only the items that
    changed.

- id: ack_response
  description: >-
    After receiving a valid command block (terminated by blank line), the device
    responds with "ACK" followed by the relevant updated status block(s).
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes

- The protocol is text-based over TCP. Each command is a block: a header in CAPS followed by a colon, then key-value lines, terminated by a blank line (double newline).
- Relative adjustments are supported by prefixing the value with `+` or `-` (e.g. `Matte Density: +10`).
- Status updates are asynchronous and broadcast to all connected clients. Clients must watch for status updates rather than assuming a command succeeded.
- The `Tally Active` control is read-only.
- GPI features (GPI LIST, GP input/output controls) are not available on Ultimatte 12 HD Mini.
- 4320p video formats are only available on Ultimatte 12 8K.
- PsF video formats are not supported on Ultimatte 12 HD Mini.
- Frame buffer image loading/removal must be done via Smart Remote 4 or Software Control; the Ethernet protocol only supports assigning already-loaded images.
- Default IP address is 192.168.10.220. All models except Ultimatte 12 HD Mini support DHCP.
- Ports 9996 (Software Control / Smart Remote 4) and 9977 (Ultimatte Setup) are also used by the device but their protocols are not documented in this source.
- `Veil Correct Vertical Size` and `Flare Correct Vertical Size` ranges are device-dependent: 0-6 on Ultimatte 12 8K (protocol 2.0), 0-3 on Ultimatte 12 (version 1.2). Recorded here as max 6.
- Loop outputs for 'garbage matte' and 'holdout matte' inputs are available on Ultimatte 12, not Ultimatte 12 8K.
- `Custom Powerup` is marked deprecated in the source.

<!-- UNRESOLVED: protocol version not stated — source references "protocol 2.0" and "version 1.2" in notes but does not state the current version -->
<!-- UNRESOLVED: error/block format for rejected commands not documented beyond ACK -->
<!-- UNRESOLVED: "Message block" mentioned as possible response to file/GPI commands but format not documented -->
<!-- UNRESOLVED: maximum number of simultaneous TCP connections not stated -->
<!-- UNRESOLVED: CAMERA CONTROL mode values not enumerated beyond "idle" -->
<!-- UNRESOLVED: general NETWORK block field list not shown in source (only NETWORK INTERFACE block fields shown) -->

## Provenance

```yaml
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - "https://documents.blackmagicdesign.com/UserManuals/UltimatteManual.pdf?_v=1772697610000"
retrieved_at: 2026-07-24T18:50:09.756Z
last_checked_at: 2026-08-05T08:13:53.123Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:13:53.123Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions match source block syntax verbatim; transport port 9998 confirmed; all status blocks represented in Feedbacks. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility range not stated"
- "ports 9996 and 9977 mentioned for other software but their control protocol is not documented here"
- "field list for the general NETWORK block not shown in source"
- "MESSAGE block field format not documented in source"
- "max is video-format dependent"
- "no multi-step macro sequences explicitly documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "protocol version not stated — source references \"protocol 2.0\" and \"version 1.2\" in notes but does not state the current version"
- "error/block format for rejected commands not documented beyond ACK"
- "\"Message block\" mentioned as possible response to file/GPI commands but format not documented"
- "maximum number of simultaneous TCP connections not stated"
- "CAMERA CONTROL mode values not enumerated beyond \"idle\""
- "general NETWORK block field list not shown in source (only NETWORK INTERFACE block fields shown)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
