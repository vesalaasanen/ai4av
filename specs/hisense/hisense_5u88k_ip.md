---
spec_id: admin/hisense-5u88k
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U88K Control Spec"
manufacturer: HiSense
model_family: 5U88K
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U88K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-04T09:11:54.947Z
last_checked_at: 2026-06-25T17:49:52.163Z
generated_at: 2026-06-25T17:49:52.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The family hint lists TCP/IP as the known protocol, but this source artifact documents RS-232C serial control only; no TCP port, base URL, or IP framing appears in the source."
  - "firmware version compatibility not stated in source."
  - "source contains no explicit safety warnings or interlock"
  - "TCP/IP control path referenced by the family hint is not documented in this source; serial is the only transport evidenced."
  - "exact model string \"5U88K\" taken from the task device name; the source itself names only \"Hisense® Prosumer TV\" and does not print the model number."
  - "firmware version compatibility, voltage/power specs, and fault/error-recovery behavior not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-25T17:49:52.163Z
  matched_actions: 177
  action_count: 177
  confidence: medium
  summary: "deterministic presence proof: 177/177 payloads verbatim in source; stratified Sonnet sample corroborated (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# HiSense 5U88K Control Spec

## Summary
Commercial/prosumer LED TV (HiSense 5U88K, marketed in the source as the "Hisense® Prosumer TV") controlled over an RS-232C serial link via a DB9 D-sub connector. This spec covers power, input selection, picture/audio adjustment, tuner/channel, captions, OSD language, remote-button simulation, and commercial/install settings (volume lock, key lock, menu/OSD access, power-on input). The link is a fixed-length ASCII frame protocol with an 8-bit checksum and per-device CLIENT ID addressing.

<!-- UNRESOLVED: The family hint lists TCP/IP as the known protocol, but this source artifact documents RS-232C serial control only; no TCP port, base URL, or IP framing appears in the source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
# Source documents RS-232C serial only (DB9). The "TCP/IP" family hint is not
# substantiated by this source artifact, so tcp/addressing.port are OMITTED
# (N/A), not UNRESOLVED. See Summary/Notes for the discrepancy.
protocols:
  - serial
serial:
  baud_rate: 9600        # "Baud Rate 9600bps (UART)"
  data_bits: 8           # "Data Length 8bits"
  parity: none           # "Parity Bit None"
  stop_bits: 1           # "Stop Bit 1bit"
  flow_control: none     # "Flow Control None"
  # Communication Code: ASCII. Connector: DB9 D-sub, female chassis mount on TV.
  # Electrical: RS-232C compliant. Pinout documented in source (male/female 9-pin).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# All inferred from command examples present in the source (Tier 2).
- powerable   # inferred: POWR0000 (standby) / POWR0001 (power on), PWRE power-on-enable
- queryable   # inferred: extensive ???? state queries (PWRE/INPT/PMOD/BRIT/CONT/COLR/TINT/SHRP/ASPT/OVSN/CTEM/BKLV/AMOD/VOLM/MUTE/ASPK/TUNR/CC##/LANG/PLED/PBTN/MAVL/SVOL/VLFL/RMOT/PANL/MENU/AVMN/OSD#/INPM)
- levelable   # inferred: VOLM/BRIT/CONT/COLR/TINT/SHRP/BKLV/MAVL/VLFL scalar set commands
- routable    # inferred: INPT input-source selection among TV/AV/Component/HDMI1-4/VGA
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: power_on_command_enable_query_power_on_command_setting_pwre0000_okay_disable_rs_232_remote_power_on
  label: "POWER ON COMMAND ENABLE/QUERY POWER ON COMMAND SETTING PWRE0000 OKAY Disable RS-232 Remote Power On"
  kind: action
  command: "53 34 36 35 50 57 52 45 30 30 30 30 10 0D 53 41 4C 4C 50 57 52 45 30 30 30 30 D6 0D"
  params: []

- id: power_on_command_enable_query_power_on_command_setting_pwre0001_okay_enable_rs_232_remote_power_on
  label: "POWER ON COMMAND ENABLE/QUERY POWER ON COMMAND SETTING PWRE0001 OKAY Enable RS-232 Remote Power On"
  kind: action
  command: "53 34 36 35 50 57 52 45 30 30 30 31 0F 0D 53 41 4C 4C 50 57 52 45 30 30 30 31 D5 0D"
  params: []

- id: set_power_on_off_control_powr0000_okay_stand_by
  label: "SET POWER ON/OFF CONTROL POWR0000 OKAY Stand by"
  kind: action
  command: "53 34 36 35 50 4F 57 52 30 30 30 30 06 0D 53 41 4C 4C 50 4F 57 52 30 30 30 30 CC 0D"
  params: []

- id: set_power_on_off_control_powr0001_okay_power_on
  label: "SET POWER ON/OFF CONTROL POWR0001 OKAY Power on"
  kind: action
  command: "53 34 36 35 50 4F 57 52 30 30 30 31 05 0D 53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D"
  params: []

- id: set_input_source_selection_inpt0000_okay_change_input_signal_one_at_a_time
  label: "SET INPUT SOURCE SELECTION INPT0000 OKAY Change Input Signal One at a Time"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 30 13 0D 53 41 4C 4C 49 4E 50 54 30 30 30 30 D9 0D"
  params: []

- id: set_input_source_selection_inpt0001_okay_set_input_signal_tv
  label: "SET INPUT SOURCE SELECTION INPT0001 OKAY Set Input Signal: TV"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 31 12 0D 53 41 4C 4C 49 4E 50 54 30 30 30 31 D8 0D"
  params: []

- id: set_input_source_selection_inpt0004_okay_set_input_signal_av
  label: "SET INPUT SOURCE SELECTION INPT0004 OKAY Set Input Signal: AV"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 34 0F 0D 53 41 4C 4C 49 4E 50 54 30 30 30 34 D5 0D"
  params: []

- id: set_input_source_selection_inpt0003_okay_set_input_signal_component
  label: "SET INPUT SOURCE SELECTION INPT0003 OKAY Set Input Signal: Component"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 33 10 0D 53 41 4C 4C 49 4E 50 54 30 30 30 33 D6 0D"
  params: []

- id: set_input_source_selection_inpt0009_okay_set_input_signal_hdmi1
  label: "SET INPUT SOURCE SELECTION INPT0009 OKAY Set Input Signal: HDMI1"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 39 0A 0D 53 41 4C 4C 49 4E 50 54 30 30 30 39 D0 0D"
  params: []

- id: set_input_source_selection_inpt0010_okay_set_input_signal_hdmi2
  label: "SET INPUT SOURCE SELECTION INPT0010 OKAY Set Input Signal: HDMI2"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 31 30 12 0D 53 41 4C 4C 49 4E 50 54 30 30 31 30 D8 0D"
  params: []

- id: set_input_source_selection_inpt0011_okay_set_input_signal_hdmi3
  label: "SET INPUT SOURCE SELECTION INPT0011 OKAY Set Input Signal: HDMI3"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 31 31 11 0D 53 41 4C 4C 49 4E 50 54 30 30 31 31 D7 0D"
  params: []

- id: set_input_source_selection_inpt0012_okay_set_input_signal_hdmi4
  label: "SET INPUT SOURCE SELECTION INPT0012 OKAY Set Input Signal: HDMI4"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 31 32 10 0D 53 41 4C 4C 49 4E 50 54 30 30 31 32 D6 0D"
  params: []

- id: set_input_source_selection_inpt0006_okay_set_input_signal_vga
  label: "SET INPUT SOURCE SELECTION INPT0006 OKAY Set Input Signal: VGA"
  kind: action
  command: "53 34 36 35 49 4E 50 54 30 30 30 36 0D 0D 53 41 4C 4C 49 4E 50 54 30 30 30 36 D3 0D"
  params: []

- id: set_picture_mode_pmod0000_okay_set_picture_mode_standard
  label: "SET PICTURE MODE PMOD0000 OKAY Set Picture Mode: Standard"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 30 1E 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 30 E4 0D"
  params: []

- id: set_picture_mode_pmod0002_okay_set_picture_mode_vivid
  label: "SET PICTURE MODE PMOD0002 OKAY Set Picture Mode: Vivid"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 32 1C 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 32 E2 0D"
  params: []

- id: set_picture_mode_pmod0003_okay_set_picture_mode_energy_saving
  label: "SET PICTURE MODE PMOD0003 OKAY Set Picture Mode: EnergySaving"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 33 1B 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 33 E1 0D"
  params: []

- id: set_picture_mode_pmod0004_okay_set_picture_mode_theater
  label: "SET PICTURE MODE PMOD0004 OKAY Set Picture Mode: Theater"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 34 1A 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 34 E0 0D"
  params: []

- id: set_picture_mode_pmod0005_okay_set_picture_mode_game
  label: "SET PICTURE MODE PMOD0005 OKAY Set Picture Mode: Game"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 35 19 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 35 DF 0D"
  params: []

- id: set_picture_mode_pmod0006_okay_set_picture_mode_sport
  label: "SET PICTURE MODE PMOD0006 OKAY Set Picture Mode: Sport"
  kind: action
  command: "53 34 36 35 50 4D 4F 44 30 30 30 36 18 0D 53 41 4C 4C 50 4D 4F 44 30 30 30 36 DE 0D"
  params: []

- id: set_brightness_value_brit（0000_0100）_okay_set_brightness_value
  label: "Set Brightness Value BRIT`（`0000-0100`）` OKAY Set Brightness Value"
  kind: action
  command: "53 34 36 35 42 52 49 54 30 30 33 35 15 0D 53 41 4C 4C 42 52 49 54 30 30 33 35 DB 0D"
  params: []

- id: set_brightness_to_0_brit（0000）_okay_set_brightness_value_to_0
  label: "Set Brightness to 0 BRIT`（`0000`）` OKAY Set Brightness Value to 0"
  kind: action
  command: "53 34 36 35 42 52 49 54 30 30 30 30 E3 0D 53 41 4C 4C 42 52 49 54 30 30 30 30 E3 0D"
  params: []

- id: set_brightness_to_50_brit（0050）_okay_set_brightness_value_to_50
  label: "Set Brightness to 50 BRIT`（`0050`）` OKAY Set Brightness Value to 50"
  kind: action
  command: "53 34 36 35 42 52 49 54 30 30 35 30 DE 0D 53 41 4C 4C 42 52 49 54 30 30 35 30 DE 0D"
  params: []

- id: set_brightness_to_100_brit（0100_okay_set_brightness_value_to_100
  label: "Set Brightness to 100 BRIT`（`0100) OKAY Set Brightness Value to 100"
  kind: action
  command: "53 34 36 35 42 52 49 54 30 31 30 30 E2 0D 53 41 4C 4C 42 52 49 54 30 31 30 30 E2 0D"
  params: []

- id: set_contrast_value_cont（0000_0100）_okay_set_contrast_value
  label: "Set Contrast Value CONT`（`0000-0100`）` OKAY Set Contrast Value"
  kind: action
  command: "53 34 36 35 43 4F 4E 54 30 30 36 39 0B 0D 53 41 4C 4C 43 4F 4E 54 30 30 36 39 D1 0D"
  params: []

- id: set_contrast_to_0_cont（0000_okay_set_contrast_value_to_0
  label: "Set Contrast to 0 CONT`（`0000) OKAY Set Contrast Value to 0"
  kind: action
  command: "53 34 36 35 43 4F 4E 54 30 30 30 30 E0 0D 53 41 4C 4C 43 4F 4E 54 30 30 30 30 E0 0D"
  params: []

- id: set_contrast_to_50_cont（0050_okay_set_contrast_value_to_50
  label: "Set Contrast to 50 CONT`（`0050) OKAY Set Contrast Value to 50"
  kind: action
  command: "53 34 36 35 43 4F 4E 54 30 30 35 30 DB 0D 53 41 4C 4C 43 4F 4E 54 30 30 35 30 DB 0D"
  params: []

- id: set_contrast_to_100_cont（0100_okay_set_contrast_value_to_100
  label: "Set Contrast to 100 CONT`（`0100) OKAY Set Contrast Value to 100"
  kind: action
  command: "53 34 36 35 43 4F 4E 54 30 31 30 30 DF 0D 53 41 4C 4C 43 4F 4E 54 30 31 30 30 DF 0D"
  params: []

- id: set_color_saturation_value_colr（0000_0100）_okay_set_color_saturation_value
  label: "Set Color Saturation Value COLR`（`0000-0100`）` OKAY Set Color Saturation Value"
  kind: action
  command: "53 34 36 35 43 4F 4C 52 30 30 30 31 1D 0D 53 41 4C 4C 43 4F 4C 52 30 30 30 31 E3 0D"
  params: []

- id: set_tint_value_tint（0000_0100）_okay_set_tint_value
  label: "Set TINT Value TINT`（`0000-0100`）` OKAY Set TINT Value"
  kind: action
  command: "53 34 36 35 54 49 4E 54 30 30 39 39 FD 0D 53 41 4C 4C 54 49 4E 54 30 30 39 39 C3 0D"
  params: []

- id: set_sharpness_value_shrp（0000_0020）_okay_set_sharpness_value
  label: "Set Sharpness Value SHRP`（`0000-0020`）` OKAY Set Sharpness Value"
  kind: action
  command: "53 34 36 35 53 48 52 50 30 30 32 30 0F 0D 53 41 4C 4C 53 48 52 50 30 30 32 30 D5 0D"
  params: []

- id: set_sharpness_to_0_shrp（0000_okay_set_sharpness_value_to_0
  label: "Set Sharpness to 0 SHRP`（`0000) OKAY Set Sharpness Value to 0"
  kind: action
  command: "53 34 36 35 53 48 52 50 30 30 30 30 D7 0D 53 41 4C 4C 53 48 52 50 30 30 30 30 D7 0D"
  params: []

- id: set_sharpness_to_10_shrp（0010_okay_set_sharpness_value_to_10
  label: "Set Sharpness to 10 SHRP`（`0010) OKAY Set Sharpness Value to 10"
  kind: action
  command: "53 34 36 35 53 48 52 50 30 30 31 30 D6 0D 53 41 4C 4C 53 48 52 50 30 30 31 30 D6 0D"
  params: []

- id: set_sharpness_to_20_shrp（0020_okay_set_sharpness_value_to_20
  label: "Set Sharpness to 20 SHRP`（`0020) OKAY Set Sharpness Value to 20"
  kind: action
  command: "53 34 36 35 53 48 52 50 30 30 32 30 D5 0D 53 41 4C 4C 53 48 52 50 30 30 32 30 D5 0D"
  params: []

- id: set_aspect_ratio_aspt0000_okay_set_aspect_ratio_auto
  label: "SET ASPECT RATIO ASPT0000 OKAY SET ASPECT RATIO: Auto"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 30 16 0D 53 41 4C 4C 41 53 50 54 30 30 30 30 DC 0D"
  params: []

- id: set_aspect_ratio_aspt0002_okay_set_aspect_ratio_normal
  label: "SET ASPECT RATIO ASPT0002 OKAY SET ASPECT RATIO: Normal"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 32 14 0D 53 41 4C 4C 41 53 50 54 30 30 30 32 DA 0D"
  params: []

- id: set_aspect_ratio_aspt0003_okay_set_aspect_ratio_zoom
  label: "SET ASPECT RATIO ASPT0003 OKAY SET ASPECT RATIO: Zoom"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 33 13 0D 53 41 4C 4C 41 53 50 54 30 30 30 33 D9 0D"
  params: []

- id: set_aspect_ratio_aspt0004_okay_set_aspect_ratio_wide
  label: "SET ASPECT RATIO ASPT0004 OKAY SET ASPECT RATIO: Wide"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 34 12 0D 53 41 4C 4C 41 53 50 54 30 30 30 34 D8 0D"
  params: []

- id: set_aspect_ratio_aspt0005_okay_set_aspect_ratio_direct
  label: "SET ASPECT RATIO ASPT0005 OKAY SET ASPECT RATIO: Direct"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 35 11 0D 53 41 4C 4C 41 53 50 54 30 30 30 35 D7 0D"
  params: []

- id: set_aspect_ratio_aspt0006_okay_set_aspect_ratio_1_to_1pixel_map
  label: "SET ASPECT RATIO ASPT0006 OKAY SET ASPECT RATIO: 1-to-1pixel map"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 36 10 0D 53 41 4C 4C 41 53 50 54 30 30 30 36 D6 0D"
  params: []

- id: set_aspect_ratio_aspt0007_okay_set_aspect_ratio_panoramic
  label: "SET ASPECT RATIO ASPT0007 OKAY SET ASPECT RATIO: Panoramic"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 37 0F 0D 53 41 4C 4C 41 53 50 54 30 30 30 37 D5 0D"
  params: []

- id: set_aspect_ratio_aspt0008_okay_set_aspect_ratio_cinema
  label: "SET ASPECT RATIO ASPT0008 OKAY SET ASPECT RATIO: Cinema"
  kind: action
  command: "53 34 36 35 41 53 50 54 30 30 30 38 0E 0D 53 41 4C 4C 41 53 50 54 30 30 30 38 D4 0D"
  params: []

- id: set_overscan_ovsn0000_okay_on
  label: "Set Overscan OVSN0000 OKAY On"
  kind: action
  command: "53 34 36 35 4F 56 53 4E 30 30 30 30 08 0D 53 41 4C 4C 4F 56 53 4E 30 30 30 30 CE 0D"
  params: []

- id: set_overscan_ovsn0002_okay_off
  label: "Set Overscan OVSN0002 OKAY Off"
  kind: action
  command: "53 34 36 35 4F 56 53 4E 30 30 30 32 06 0D 53 41 4C 4C 4F 56 53 4E 30 30 30 32 CC 0D"
  params: []

- id: reset_picture_settings_rstp1000_okay_reset_picture_settings
  label: "Reset Picture Settings RSTP1000 OKAY Reset Picture Settings"
  kind: action
  command: "53 34 36 35 52 53 54 50 31 30 30 30 04 0D 53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D"
  params: []

- id: set_color_temp_ctem0000_okay_set_color_temp_high
  label: "SET COLOR TEMP CTEM0000 OKAY SET COLOR TEMP: High"
  kind: action
  command: "53 34 36 35 43 54 45 4D 30 30 30 30 25 0D 53 41 4C 4C 43 54 45 4D 30 30 30 30 EB 0D"
  params: []

- id: set_color_temp_ctem0002_okay_set_color_temp_middle
  label: "SET COLOR TEMP CTEM0002 OKAY SET COLOR TEMP: Middle"
  kind: action
  command: "53 34 36 35 43 54 45 4D 30 30 30 32 23 0D 53 41 4C 4C 43 54 45 4D 30 30 30 32 E9 0D"
  params: []

- id: set_color_temp_ctem0003_okay_set_color_temp_mid_low
  label: "SET COLOR TEMP CTEM0003 OKAY SET COLOR TEMP: Mid-Low"
  kind: action
  command: "53 34 36 35 43 54 45 4D 30 30 30 33 22 0D 53 41 4C 4C 43 54 45 4D 30 30 30 33 E8 0D"
  params: []

- id: set_color_temp_ctem0004_okay_set_color_temp_low
  label: "SET COLOR TEMP CTEM0004 OKAY SET COLOR TEMP: Low"
  kind: action
  command: "53 34 36 35 43 54 45 4D 30 30 30 34 21 0D 53 41 4C 4C 43 54 45 4D 30 30 30 34 E7 0D"
  params: []

- id: set_backlight_value_bklv（0000_0100）_okay_set_backlight_value_0000_0100
  label: "SET BACKLIGHT VALUE BKLV`（`0000-0100`）` OKAY SET BACKLIGHT VALUE: 0000-0100"
  kind: action
  command: "53 34 36 35 42 4B 4C 56 30 30 33 30 1C 0D 53 41 4C 4C 42 4B 4C 56 30 30 33 30 E2 0D"
  params: []

- id: set_sound_mode_amod0000_okay_set_sound_mode_standard
  label: "SET SOUND MODE AMOD0000 OKAY SET SOUND MODE: Standard"
  kind: action
  command: "53 34 36 35 41 4D 4F 44 30 30 30 30 2D 0D 53 41 4C 4C 41 4D 4F 44 30 30 30 30 F3 0D"
  params: []

- id: set_sound_mode_amod0002_okay_set_sound_mode_theater
  label: "SET SOUND MODE AMOD0002 OKAY SET SOUND MODE: Theater"
  kind: action
  command: "53 34 36 35 41 4D 4F 44 30 30 30 32 2B 0D 53 41 4C 4C 41 4D 4F 44 30 30 30 32 F1 0D"
  params: []

- id: set_sound_mode_amod0003_okay_set_sound_mode_music
  label: "SET SOUND MODE AMOD0003 OKAY SET SOUND MODE: Music"
  kind: action
  command: "53 34 36 35 41 4D 4F 44 30 30 30 33 2A 0D 53 41 4C 4C 41 4D 4F 44 30 30 30 33 F0 0D"
  params: []

- id: set_sound_mode_amod0004_okay_set_sound_mode_speech
  label: "SET SOUND MODE AMOD0004 OKAY SET SOUND MODE: Speech"
  kind: action
  command: "53 34 36 35 41 4D 4F 44 30 30 30 34 29 0D 53 41 4C 4C 41 4D 4F 44 30 30 30 34 EF 0D"
  params: []

- id: set_sound_mode_amod0005_okay_set_sound_mode_late_night
  label: "SET SOUND MODE AMOD0005 OKAY SET SOUND MODE: Late night"
  kind: action
  command: "53 34 36 35 41 4D 4F 44 30 30 30 35 28 0D 53 41 4C 4C 41 4D 4F 44 30 30 30 35 EE 0D"
  params: []

- id: reset_audio_settings_rsta2000_okay_reset_audio_settings
  label: "Reset Audio Settings RSTA2000 OKAY Reset Audio Settings"
  kind: action
  command: "53 34 36 35 52 53 54 41 32 30 30 30 12 0D 53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D"
  params: []

- id: set_volume_adjust_volm（0000_0100）_okay_set_volume_adjust_0_100
  label: "SET Volume ADJUST VOLM`（`0000-0100`）` OKAY SET Volume ADJUST:0-100"
  kind: action
  command: "53 34 36 35 56 4F 4C 4D 30 30 31 35 0A 0D 53 41 4C 4C 56 4F 4C 4D 30 30 31 35 D0 0D"
  params: []

- id: set_volume_to_0_volm（0000_okay_set_volume_value_to_0
  label: "Set Volume to 0 VOLM`（`0000) OKAY SET Volume Value to 0"
  kind: action
  command: "53 34 36 35 56 4F 4C 4D 30 30 30 30 D6 0D 53 41 4C 4C 56 4F 4C 4D 30 30 30 30 D6 0D"
  params: []

- id: set_volume_to_50_volm（0050_okay_set_volume_value_to_50
  label: "Set Volume to 50 VOLM`（`0050) OKAY SET Volume Value to 50"
  kind: action
  command: "53 34 36 35 56 4F 4C 4D 30 30 35 30 D1 0D 53 41 4C 4C 56 4F 4C 4D 30 30 35 30 D1 0D"
  params: []

- id: set_volume_to_100_volm（0100_okay_set_volume_value_to_100
  label: "Set Volume to 100 VOLM`（`0100) OKAY SET Volume Value to 100"
  kind: action
  command: "53 34 36 35 56 4F 4C 4D 30 31 30 30 D5 0D 53 41 4C 4C 56 4F 4C 4D 30 31 30 30 D5 0D"
  params: []

- id: set_mute_mute0000_okay_off_mute_off
  label: "SET MUTE MUTE0000 OKAY/OFF MUTE OFF"
  kind: action
  command: "53 34 36 35 4D 55 54 45 30 30 30 30 13 0D 53 41 4C 4C 4D 55 54 45 30 30 30 30 D9 0D"
  params: []

- id: set_mute_mute0001_okay_on_mute_on
  label: "SET MUTE MUTE0001 OKAY/ON MUTE ON"
  kind: action
  command: "53 34 36 35 4D 55 54 45 30 30 30 31 12 0D 53 41 4C 4C 4D 55 54 45 30 30 30 31 D8 0D"
  params: []

- id: set_tv_speaker_aspk0000_okay_set_tv_speaker_to_off
  label: "SET TV Speaker ASPK0000 OKAY SET TV Speaker TO Off"
  kind: action
  command: "53 34 36 35 41 53 50 4B 30 30 30 30 1F 0D 53 41 4C 4C 41 53 50 4B 30 30 30 30 E5 0D"
  params: []

- id: set_tv_speaker_aspk0002_okay_set_tv_speaker_to_on
  label: "SET TV Speaker ASPK0002 OKAY SET TV Speaker TO On"
  kind: action
  command: "53 34 36 35 41 53 50 4B 30 30 30 32 1D 0D 53 41 4C 4C 41 53 50 4B 30 30 30 32 E3 0D"
  params: []

- id: tuner_mode_tunr0000_okay_tuner_mode_antenna
  label: "Tuner Mode TUNR0000 OKAY Tuner Mode: Antenna"
  kind: action
  command: "53 34 36 35 54 55 4E 52 30 30 30 30 05 0D 53 41 4C 4C 54 55 4E 52 30 30 30 30 CB 0D"
  params: []

- id: tuner_mode_tunr0002_okay_tuner_mode_cable
  label: "Tuner Mode TUNR0002 OKAY Tuner Mode:Cable"
  kind: action
  command: "53 34 36 35 54 55 4E 52 30 30 30 32 03 0D 53 41 4C 4C 54 55 4E 52 30 30 30 32 C9 0D"
  params: []

- id: automatic_search_tscn0001_okay_automatic_search
  label: "Automatic Search TSCN0001 OKAY Automatic Search"
  kind: action
  command: "53 34 36 35 54 53 43 4E 30 30 30 31 15 0D 53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D"
  params: []

- id: channel_switch_chan0000_okay_channel_down
  label: "Channel Switch CHAN0000 OKAY Channel down"
  kind: action
  command: "53 34 36 35 43 48 41 4E 30 30 30 30 34 0D 53 41 4C 4C 43 48 41 4E 30 30 30 30 FA 0D"
  params: []

- id: channel_switch_chan0001_okay_channel_up
  label: "Channel Switch CHAN0001 OKAY Channel up"
  kind: action
  command: "53 34 36 35 43 48 41 4E 30 30 30 31 33 0D 53 41 4C 4C 43 48 41 4E 30 30 30 31 F9 0D"
  params: []

- id: caption_control_cc##0000_okay_cc_off
  label: "Caption Control CC##0000 OKAY CC: off"
  kind: action
  command: "53 34 36 35 43 43 23 23 30 30 30 30 82 0D 53 41 4C 4C 43 43 23 23 30 30 30 30 48 0D"
  params: []

- id: caption_control_cc##0002_okay_cc_on
  label: "Caption Control CC##0002 OKAY CC: on"
  kind: action
  command: "53 34 36 35 43 43 23 23 30 30 30 32 80 0D 53 41 4C 4C 43 43 23 23 30 30 30 32 46 0D"
  params: []

- id: caption_control_cc##0003_okay_cc_cc_on_when_mute
  label: "Caption Control CC##0003 OKAY CC: CC on when mute"
  kind: action
  command: "53 34 36 35 43 43 23 23 30 30 30 33 7F 0D 53 41 4C 4C 43 43 23 23 30 30 30 33 45 0D"
  params: []

- id: restore_factory_settings_rset9999_okay_reset_function_mode
  label: "Restore Factory Settings RSET9999 OKAY Reset Function Mode"
  kind: action
  command: "53 34 36 35 52 53 45 54 39 39 39 39 EC 0D 53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D"
  params: []

- id: osd_lang0000_okay_english
  label: "OSD LANG0000 OKAY English"
  kind: action
  command: "53 34 36 35 4C 41 4E 47 30 30 30 30 2C 0D 53 41 4C 4C 4C 41 4E 47 30 30 30 30 F2 0D"
  params: []

- id: osd_lang0002_okay_español
  label: "OSD LANG0002 OKAY Español"
  kind: action
  command: "53 34 36 35 4C 41 4E 47 30 30 30 32 2A 0D 53 41 4C 4C 4C 41 4E 47 30 30 30 32 F0 0D"
  params: []

- id: osd_lang0003_okay_français
  label: "OSD LANG0003 OKAY Français"
  kind: action
  command: "53 34 36 35 4C 41 4E 47 30 30 30 33 29 0D 53 41 4C 4C 4C 41 4E 47 30 30 30 33 EF 0D"
  params: []

- id: standby_led_pled0000_okay_standby_led_off
  label: "Standby LED PLED0000 OKAY StandbyLED: Off"
  kind: action
  command: "53 34 36 35 50 4C 45 44 30 30 30 30 29 0D 53 41 4C 4C 50 4C 45 44 30 30 30 30 EF 0D"
  params: []

- id: standby_led_pled0002_okay_standby_led_on
  label: "Standby LED PLED0002 OKAY StandbyLED: On"
  kind: action
  command: "53 34 36 35 50 4C 45 44 30 30 30 32 27 0D 53 41 4C 4C 50 4C 45 44 30 30 30 32 ED 0D"
  params: []

- id: ch_bttn1034_okay_ch
  label: "CH+ BTTN1034 OKAY CH+"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 34 0E 0D 53 41 4C 4C 42 54 54 4E 31 30 33 34 D4 0D"
  params: []

- id: ch_bttn1035_okay_ch
  label: "CH- BTTN1035 OKAY CH-"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 35 0D 0D 53 41 4C 4C 42 54 54 4E 31 30 33 35 D3 0D"
  params: []

- id: vol_bttn1032_okay_vol
  label: "VOL- BTTN1032 OKAY VOL-"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 32 10 0D 53 41 4C 4C 42 54 54 4E 31 30 33 32 D6 0D"
  params: []

- id: vol_bttn1033_okay_vol
  label: "VOL+ BTTN1033 OKAY VOL+"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 33 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 33 33 D5 0D"
  params: []

- id: back_bttn1045_okay_back
  label: "BACK BTTN1045 OKAY BACK"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 35 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 34 35 D2 0D"
  params: []

- id: power_bttn1012_okay_power
  label: "POWER BTTN1012 OKAY POWER"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 32 12 0D 53 41 4C 4C 42 54 54 4E 31 30 31 32 D8 0D"
  params: []

- id: mute_bttn1031_okay_mute
  label: "MUTE BTTN1031 OKAY MUTE"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 31 11 0D 53 41 4C 4C 42 54 54 4E 31 30 33 31 D7 0D"
  params: []

- id: -dash_bttn1010_okay_-dash
  label: "-(DASH) BTTN1010 OKAY -(DASH)"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 30 14 0D 53 41 4C 4C 42 54 54 4E 31 30 31 30 DA 0D"
  params: []

- id: input_bttn1036_okay_input
  label: "INPUT BTTN1036 OKAY INPUT"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 36 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 33 36 D2 0D"
  params: []

- id: media_player_bttn1023_okay_hi_media
  label: "Media Player BTTN1023 OKAY HiMedia"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 32 33 10 0D 53 41 4C 4C 42 54 54 4E 31 30 32 33 D6 0D"
  params: []

- id: 0_bttn1000_okay_0
  label: "0 BTTN1000 OKAY 0"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 30 15 0D 53 41 4C 4C 42 54 54 4E 31 30 30 30 DB 0D"
  params: []

- id: 1_bttn1001_okay_1
  label: "1 BTTN1001 OKAY 1"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 31 14 0D 53 41 4C 4C 42 54 54 4E 31 30 30 31 DA 0D"
  params: []

- id: 2_bttn1002_okay_2
  label: "2 BTTN1002 OKAY 2"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 32 13 0D 53 41 4C 4C 42 54 54 4E 31 30 30 32 D9 0D"
  params: []

- id: 3_bttn1003_okay_3
  label: "3 BTTN1003 OKAY 3"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 33 12 0D 53 41 4C 4C 42 54 54 4E 31 30 30 33 D8 0D"
  params: []

- id: 4_bttn1004_okay_4
  label: "4 BTTN1004 OKAY 4"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 34 11 0D 53 41 4C 4C 42 54 54 4E 31 30 30 34 D7 0D"
  params: []

- id: 5_bttn1005_okay_5
  label: "5 BTTN1005 OKAY 5"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 35 10 0D 53 41 4C 4C 42 54 54 4E 31 30 30 35 D6 0D"
  params: []

- id: 6_bttn1006_okay_6
  label: "6 BTTN1006 OKAY 6"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 36 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 30 36 D5 0D"
  params: []

- id: 7_bttn1007_okay_7
  label: "7 BTTN1007 OKAY 7"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 37 0E 0D 53 41 4C 4C 42 54 54 4E 31 30 30 37 D4 0D"
  params: []

- id: 8_bttn1008_okay_8
  label: "8 BTTN1008 OKAY 8"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 38 0D 0D 53 41 4C 4C 42 54 54 4E 31 30 30 38 D3 0D"
  params: []

- id: 9_bttn1009_okay_9
  label: "9 BTTN1009 OKAY 9"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 30 39 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 30 39 D2 0D"
  params: []

- id: sleep_bttn1024_okay_sleep
  label: "SLEEP BTTN1024 OKAY SLEEP"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 32 34 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 32 34 D5 0D"
  params: []

- id: mts_sap_bttn1054_okay_mts_sap
  label: "MTS/SAP BTTN1054 OKAY MTS/SAP"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 34 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 35 34 D2 0D"
  params: []

- id: live_tv_bttn1055_okay_live_tv
  label: "Live TV BTTN1055 OKAY Live TV"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 35 0B 0D 53 41 4C 4C 42 54 54 4E 31 30 35 35 D1 0D"
  params: []

- id: pause_bttn1018_okay_pause
  label: "PAUSE BTTN1018 OKAY PAUSE"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 38 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 31 38 D2 0D"
  params: []

- id: play_bttn1016_okay_play
  label: "PLAY BTTN1016 OKAY PLAY"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 36 0E 0D 53 41 4C 4C 42 54 54 4E 31 30 31 36 D4 0D"
  params: []

- id: menu_bttn1038_okay_menu
  label: "MENU BTTN1038 OKAY MENU"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 38 0A 0D 53 41 4C 4C 42 54 54 4E 31 30 33 38 D0 0D"
  params: []

- id: exit_bttn1046_okay_exit
  label: "EXIT BTTN1046 OKAY EXIT"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 36 0B 0D 53 41 4C 4C 42 54 54 4E 31 30 34 36 D1 0D"
  params: []

- id: stop_bttn1020_okay_stop
  label: "STOP BTTN1020 OKAY STOP"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 32 30 13 0D 53 41 4C 4C 42 54 54 4E 31 30 32 30 D9 0D"
  params: []

- id: frw_<<_bttn1015_okay_frw_<<
  label: "FRW << BTTN1015 OKAY FRW <<"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 35 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 31 35 D5 0D"
  params: []

- id: cc_bttn1027_okay
  label: "CC BTTN1027 OKAY"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 32 37 0C 0D 53 41 4C 4C 42 54 54 4E 31 30 32 37 D2 0D"
  params: []

- id: red_button_bttn1050_okay_red_button
  label: "Red button BTTN1050 OKAY Red button"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 30 10 0D 53 41 4C 4C 42 54 54 4E 31 30 35 30 D6 0D"
  params: []

- id: green_button_bttn1051_okay_green_button
  label: "Green button BTTN1051 OKAY Green button"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 31 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 35 31 D5 0D"
  params: []

- id: yellow_button_bttn1053_okay_yellow_button
  label: "Yellow button BTTN1053 OKAY Yellow button"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 33 0D 0D 53 41 4C 4C 42 54 54 4E 31 30 35 33 D3 0D"
  params: []

- id: blue_button_bttn1052_okay_blue_button
  label: "Blue button BTTN1052 OKAY Blue button"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 35 32 0E 0D 53 41 4C 4C 42 54 54 4E 31 30 35 32 D4 0D"
  params: []

- id: up_bttn1041_okay_up
  label: "UP BTTN1041 OKAY UP"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 31 10 0D 53 41 4C 4C 42 54 54 4E 31 30 34 31 D6 0D"
  params: []

- id: down_bttn1042_okay_down
  label: "DOWN BTTN1042 OKAY DOWN"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 32 0F 0D 53 41 4C 4C 42 54 54 4E 31 30 34 32 D5 0D"
  params: []

- id: left_bttn1043_okay_left
  label: "LEFT BTTN1043 OKAY LEFT"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 33 0E 0D 53 41 4C 4C 42 54 54 4E 31 30 34 33 D4 0D"
  params: []

- id: right_bttn1044_okay_right
  label: "RIGHT BTTN1044 OKAY RIGHT"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 34 0D 0D 53 41 4C 4C 42 54 54 4E 31 30 34 34 D3 0D"
  params: []

- id: ok_enter_bttn1040_okay_ok_enter
  label: "OK/ENTER BTTN1040 OKAY OK/ENTER"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 34 30 11 0D 53 41 4C 4C 42 54 54 4E 31 30 34 30 D7 0D"
  params: []

- id: ffw_>>_bttn1017_okay_ffw_>>
  label: "FFW >> BTTN1017 OKAY FFW >>"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 37 0D 0D 53 41 4C 4C 42 54 54 4E 31 30 31 37 D3 0D"
  params: []

- id: previous_<<_bttn1019_okay_previous_<<
  label: "PREVIOUS << BTTN1019 OKAY PREVIOUS <<"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 31 39 0B 0D 53 41 4C 4C 42 54 54 4E 31 30 31 39 D1 0D"
  params: []

- id: next_>>_bttn1021_okay_next_>>
  label: "NEXT >> BTTN1021 OKAY NEXT >>"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 32 31 12 0D 53 41 4C 4C 42 54 54 4E 31 30 32 31 D8 0D"
  params: []

- id: connected_home_bttn1039_okay_hi_smart
  label: "Connected Home BTTN1039 OKAY HiSmart"
  kind: action
  command: "53 34 36 35 42 54 54 4E 31 30 33 39 09 0D 53 41 4C 4C 42 54 54 4E 31 30 33 39 CF 0D"
  params: []

- id: power_off_control_mode_pbtn0000_okay_ac_only
  label: "POWER OFF CONTROL MODE PBTN0000 OKAY AC ONLY"
  kind: action
  command: "53 34 36 35 50 42 54 4E 30 30 30 30 1A 0D 53 41 4C 4C 50 42 54 4E 30 30 30 30 E0 0D"
  params: []

- id: power_off_control_mode_pbtn0001_okay_all
  label: "POWER OFF CONTROL MODE PBTN0001 OKAY ALL"
  kind: action
  command: "53 34 36 35 50 42 54 4E 30 30 30 31 19 0D 53 41 4C 4C 50 42 54 4E 30 30 30 31 DF 0D"
  params: []

- id: volume_range_mavl（0000_0100）_okay_0_100
  label: "VOLUME RANGE MAVL`（`0000-0100`）` OKAY 0 - 100"
  kind: action
  command: "53 34 36 35 4D 41 56 4C 30 31 30 30 1D 0D 53 41 4C 4C 4D 41 56 4C 30 31 30 30 E3 0D"
  params: []

- id: volume_control_svol0000_okay_locked
  label: "VOLUME CONTROL SVOL0000 OKAY LOCKED"
  kind: action
  command: "53 34 36 35 53 56 4F 4C 30 30 30 30 0A 0D 53 41 4C 4C 53 56 4F 4C 30 30 30 30 D0 0D"
  params: []

- id: volume_control_svol0001_okay_last_volume
  label: "VOLUME CONTROL SVOL0001 OKAY LAST VOLUME"
  kind: action
  command: "53 34 36 35 53 56 4F 4C 30 30 30 31 09 0D 53 41 4C 4C 53 56 4F 4C 30 30 30 31 CF 0D"
  params: []

- id: volume_control_svol0002_okay_ac_reset
  label: "VOLUME CONTROL SVOL0002 OKAY AC RESET"
  kind: action
  command: "53 34 36 35 53 56 4F 4C 30 30 30 32 08 0D 53 41 4C 4C 53 56 4F 4C 30 30 30 32 CE 0D"
  params: []

- id: volume_control_svol0003_okay_standby_reset
  label: "VOLUME CONTROL SVOL0003 OKAY STANDBY RESET"
  kind: action
  command: "53 34 36 35 53 56 4F 4C 30 30 30 33 07 0D 53 41 4C 4C 53 56 4F 4C 30 30 30 33 CD 0D"
  params: []

- id: volume_locked_level_vlfl（0000_0100）_okay_0_100
  label: "VOLUME LOCKED LEVEL VLFL`（`0000-0100`）` OKAY 0 - 100"
  kind: action
  command: "53 34 36 35 56 4C 46 4C 30 30 31 30 19 0D 53 41 4C 4C 56 4C 46 4C 30 30 31 30 DF 0D"
  params: []

- id: remote_key_rmot0000_okay_enable
  label: "REMOTE KEY RMOT0000 OKAY ENABLE"
  kind: action
  command: "53 34 36 35 52 4D 4F 54 30 30 30 30 0C 0D 53 41 4C 4C 52 4D 4F 54 30 30 30 30 D2 0D"
  params: []

- id: remote_key_rmot0001_okay_disable
  label: "REMOTE KEY RMOT0001 OKAY DISABLE"
  kind: action
  command: "53 34 36 35 52 4D 4F 54 30 30 30 31 0B 0D 53 41 4C 4C 52 4D 4F 54 30 30 30 31 D1 0D"
  params: []

- id: remote_key_rmot0002_okay_partial
  label: "REMOTE KEY RMOT0002 OKAY PARTIAL"
  kind: action
  command: "53 34 36 35 52 4D 4F 54 30 30 30 32 0A 0D 53 41 4C 4C 52 4D 4F 54 30 30 30 32 D0 0D"
  params: []

- id: panel_key_panl0000_okay_enable
  label: "PANEL KEY PANL0000 OKAY ENABLE"
  kind: action
  command: "53 34 36 35 50 41 4E 4C 30 30 30 30 23 0D 53 41 4C 4C 50 41 4E 4C 30 30 30 30 E9 0D"
  params: []

- id: panel_key_panl0001_okay_disable
  label: "PANEL KEY PANL0001 OKAY DISABLE"
  kind: action
  command: "53 34 36 35 50 41 4E 4C 30 30 30 31 22 0D 53 41 4C 4C 50 41 4E 4C 30 30 30 31 E8 0D"
  params: []

- id: menu_access_menu0000_okay_enable
  label: "MENU ACCESS MENU0000 OKAY ENABLE"
  kind: action
  command: "53 34 36 35 4D 45 4E 55 30 30 30 30 19 0D 53 41 4C 4C 4D 45 4E 55 30 30 30 30 DF 0D"
  params: []

- id: menu_access_menu0001_okay_disable
  label: "MENU ACCESS MENU0001 OKAY DISABLE"
  kind: action
  command: "53 34 36 35 4D 45 4E 55 30 30 30 31 18 0D 53 41 4C 4C 4D 45 4E 55 30 30 30 31 DE 0D"
  params: []

- id: av_setting_menu_avmn0000_okay_disable
  label: "AV SETTING MENU AVMN0000 OKAY DISABLE"
  kind: action
  command: "53 34 36 35 41 56 4D 4E 30 30 30 30 1C 0D 53 41 4C 4C 41 56 4D 4E 30 30 30 30 E2 0D"
  params: []

- id: av_setting_menu_avmn0001_okay_enable
  label: "AV SETTING MENU AVMN0001 OKAY ENABLE"
  kind: action
  command: "53 34 36 35 41 56 4D 4E 30 30 30 31 1B 0D 53 41 4C 4C 41 56 4D 4E 30 30 30 31 E1 0D"
  params: []

- id: osd_mode_osd#0000_okay_enable
  label: "OSD MODE OSD#0000 OKAY ENABLE"
  kind: action
  command: "53 34 36 35 4F 53 44 23 30 30 30 30 45 0D 53 41 4C 4C 4F 53 44 23 30 30 30 30 0B 0D"
  params: []

- id: osd_mode_osd#0001_okay_disable
  label: "OSD MODE OSD#0001 OKAY DISABLE"
  kind: action
  command: "53 34 36 35 4F 53 44 23 30 30 30 31 44 0D 53 41 4C 4C 4F 53 44 23 30 30 30 31 0A 0D"
  params: []

- id: input_mode_inpm0000_okay_locked
  label: "INPUT MODE INPM0000 OKAY LOCKED"
  kind: action
  command: "53 34 36 35 49 4E 50 4D 30 30 30 30 1A 0D 53 41 4C 4C 49 4E 50 4D 30 30 30 30 E0 0D"
  params: []

- id: input_mode_inpm0001_okay_selectable
  label: "INPUT MODE INPM0001 OKAY SELECTABLE"
  kind: action
  command: "53 34 36 35 49 4E 50 4D 30 30 30 31 19 0D 53 41 4C 4C 49 4E 50 4D 30 30 30 31 DF 0D"
  params: []

- id: input_mode_inpm0002_okay_ac_reset
  label: "INPUT MODE INPM0002 OKAY AC RESET"
  kind: action
  command: "53 34 36 35 49 4E 50 4D 30 30 30 32 18 0D 53 41 4C 4C 49 4E 50 4D 30 30 30 32 DE 0D"
  params: []

- id: input_mode_inpm0003_okay_standby_reset
  label: "INPUT MODE INPM0003 OKAY STANDBY RESET"
  kind: action
  command: "53 34 36 35 49 4E 50 4D 30 30 30 33 17 0D 53 41 4C 4C 49 4E 50 4D 30 30 30 33 DD 0D"
  params: []

- id: power_on_input_selection_pois0000_okay_last
  label: "POWER ON INPUT SELECTION POIS0000 OKAY LAST"
  kind: action
  command: "53 34 36 35 50 4F 49 53 30 30 30 30 13 0D 53 41 4C 4C 50 4F 49 53 30 30 30 30 D9 0D"
  params: []

- id: power_on_input_selection_pois0001_okay_air
  label: "POWER ON INPUT SELECTION POIS0001 OKAY Air"
  kind: action
  command: "53 34 36 35 50 4F 49 53 30 30 30 31 12 0D 53 41 4C 4C 50 4F 49 53 30 30 30 31 D8 0D"
  params: []

- id: power_on_input_selection_pois0002_okay_av
  label: "POWER ON INPUT SELECTION POIS0002 OKAY AV"
  kind: action
  command: "53 34 36 35 50 4F 49 53 30 30 30 32 11 0D 53 41 4C 4C 50 4F 49 53 30 30 30 32 D7 0D"
  params: []

- id: power_on_input_selection_pois0003_okay_component
  label: "POWER ON INPUT SELECTION POIS0003 OKAY Component"
  kind: action
  command: "53 34 36 35 50 4F 49 53 30 30 30 33 10 0D 53 41 4C 4C 50 4F 49 53 30 30 30 33 D6 0D"
  params: []
```

## Feedbacks
```yaml
- id: power_on_command_enable_query_power_on_command_setting_pwre????_0_disable_rs_232_remote_boot
  label: "POWER ON COMMAND ENABLE/QUERY POWER ON COMMAND SETTING PWRE???? 0 Disable RS-232 Remote Boot"
  kind: query
  query_command: "51 34 36 35 50 57 52 45 3F 3F 3F 3F D6 0D 51 41 4C 4C 50 57 52 45 3F 3F 3F 3F 9C 0D"

- id: query_current_input_source_inpt????_1_current_input_tv
  label: "QUERY CURRENT INPUT SOURCE INPT???? 1 Current Input: TV"
  kind: query
  query_command: "51 34 36 35 49 4E 50 54 3F 3F 3F 3F D9 0D 51 41 4C 4C 49 4E 50 54 3F 3F 3F 3F 9F 0D"

- id: query_picture_mode_pmod????_0_current_picture_mode_standard
  label: "QUERY PICTURE MODE PMOD???? 0 Current Picture Mode: Standard"
  kind: query
  query_command: "51 34 36 35 50 4D 4F 44 3F 3F 3F 3F E4 0D 51 41 4C 4C 50 4D 4F 44 3F 3F 3F 3F AA 0D"

- id: query_brightness_value_brit????_0_100_query_brightness_value
  label: "QueryBrightness Value BRIT???? 0-100 QueryBrightness Value"
  kind: query
  query_command: "51 34 36 35 42 52 49 54 3F 3F 3F 3F E3 0D 51 41 4C 4C 42 52 49 54 3F 3F 3F 3F A9 0D"

- id: query_contrast_value_cont????_0_100_query_contrast_value
  label: "QueryContrast Value CONT???? 0-100 QueryContrast Value"
  kind: query
  query_command: "51 34 36 35 43 4F 4E 54 3F 3F 3F 3F E0 0D 51 41 4C 4C 43 4F 4E 54 3F 3F 3F 3F A6 0D"

- id: query_color_saturation_value_colr????_0_100_query_color_saturation_value
  label: "QueryColor Saturation Value COLR???? 0-100 QueryColor Saturation Value"
  kind: query
  query_command: "51 34 36 35 43 4F 4C 52 3F 3F 3F 3F E4 0D 51 41 4C 4C 43 4F 4C 52 3F 3F 3F 3F AA 0D"

- id: query_tint_value_tint????_0_100_query_tint_value
  label: "QueryTINT Value TINT???? 0-100 QueryTINT Value"
  kind: query
  query_command: "51 34 36 35 54 49 4E 54 3F 3F 3F 3F D5 0D 51 41 4C 4C 54 49 4E 54 3F 3F 3F 3F 9B 0D"

- id: query_sharpness_value_shrp????_0_20_query_sharpness_value
  label: "QuerySharpness Value SHRP???? 0-20 QuerySharpness Value"
  kind: query
  query_command: "51 34 36 35 53 48 52 50 3F 3F 3F 3F D7 0D 51 41 4C 4C 53 48 52 50 3F 3F 3F 3F 9D 0D"

- id: query_current_aspect_ratio_aspt????_0_query_current_aspect_ratio_auto
  label: "QUERY CURRENT ASPECT RATIO ASPT???? 0 QUERY CURRENT ASPECT RATIO: Auto"
  kind: query
  query_command: "51 34 36 35 41 53 50 54 3F 3F 3F 3F DC 0D 51 41 4C 4C 41 53 50 54 3F 3F 3F 3F A2 0D"

- id: query_overscan_ovsn????_0_on
  label: "QueryOverscan OVSN???? 0 On"
  kind: query
  query_command: "51 34 36 35 4F 56 53 4E 3F 3F 3F 3F CE 0D 51 41 4C 4C 4F 56 53 4E 3F 3F 3F 3F 94 0D"

- id: query_color_temp_ctem????_0_current_color_temp_high
  label: "QUERY COLOR TEMP CTEM???? 0 Current Color Temp: High"
  kind: query
  query_command: "51 34 36 35 43 54 45 4D 3F 3F 3F 3F EB 0D 51 41 4C 4C 43 54 45 4D 3F 3F 3F 3F B1 0D"

- id: query_backlight_value_bklv????_0_100_current_backlight_value_0_100
  label: "QUERY BACKLIGHT VALUE BKLV???? 0-100 CURRENT BACKLIGHT VALUE: 0-100"
  kind: query
  query_command: "51 34 36 35 42 4B 4C 56 3F 3F 3F 3F E5 0D 51 41 4C 4C 42 4B 4C 56 3F 3F 3F 3F AB 0D"

- id: query_sound_mode_amod????_0_query_sound_mode_standard
  label: "QUERY SOUND MODE AMOD???? 0 QUERY SOUND MODE: Standard"
  kind: query
  query_command: "51 34 36 35 41 4D 4F 44 3F 3F 3F 3F F3 0D 51 41 4C 4C 41 4D 4F 44 3F 3F 3F 3F B9 0D"

- id: query_volume_volm????_0_100_query_currrent_volume
  label: "QUERY VOLUME VOLM???? 0-100 QUERY CURRRENT VOLUME"
  kind: query
  query_command: "51 34 36 35 56 4F 4C 4D 3F 3F 3F 3F D6 0D 51 41 4C 4C 56 4F 4C 4D 3F 3F 3F 3F 9C 0D"

- id: query_mute_status_mute????_0_current_status_not_mute
  label: "QUERY MUTE STATUS MUTE???? 0 CURRENT STATUS: NOT MUTE"
  kind: query
  query_command: "51 34 36 35 4D 55 54 45 3F 3F 3F 3F D9 0D 51 41 4C 4C 4D 55 54 45 3F 3F 3F 3F 9F 0D"

- id: query_tv_speaker_aspk????_0_current_tv_speaker_off
  label: "QUERY TV Speaker ASPK???? 0 CURRENT TV Speaker: Off"
  kind: query
  query_command: "51 34 36 35 41 53 50 4B 3F 3F 3F 3F E5 0D 51 41 4C 4C 41 53 50 4B 3F 3F 3F 3F AB 0D"

- id: query_tuner_mode_tunr????_0_tuner_mode_antenna
  label: "Query Tuner Mode TUNR???? 0 Tuner Mode:Antenna"
  kind: query
  query_command: "51 34 36 35 54 55 4E 52 3F 3F 3F 3F CB 0D 51 41 4C 4C 54 55 4E 52 3F 3F 3F 3F 91 0D"

- id: query_caption_control_cc##????_0_cc_off
  label: "Query Caption Control CC##???? 0 CC: off"
  kind: query
  query_command: "51 34 36 35 43 43 23 23 3F 3F 3F 3F 48 0D 51 41 4C 4C 43 43 23 23 3F 3F 3F 3F 0E 0D"

- id: query_osd_language_lang????_0_english
  label: "Query OSD Language LANG???? 0 English"
  kind: query
  query_command: "51 34 36 35 4C 41 4E 47 3F 3F 3F 3F F2 0D 51 41 4C 4C 4C 41 4E 47 3F 3F 3F 3F B8 0D"

- id: query_standby_led_pled????_0_standby_led_off
  label: "Query Standby LED PLED???? 0 StandbyLED:Off"
  kind: query
  query_command: "51 34 36 35 50 4C 45 44 3F 3F 3F 3F EF 0D 51 41 4C 4C 50 4C 45 44 3F 3F 3F 3F B5 0D"

- id: query_power_off_control_mode_pbtn????_0_ac_only
  label: "Query POWER OFF CONTROL MODE PBTN???? 0 AC ONLY"
  kind: query
  query_command: "51 34 36 35 50 42 54 4E 3F 3F 3F 3F E0 0D 51 41 4C 4C 50 42 54 4E 3F 3F 3F 3F A6 0D"

- id: query_volume_range_mavl????_0_100_0_100
  label: "Query VOLUME RANGE MAVL???? 0-100 0-100"
  kind: query
  query_command: "51 34 36 35 4D 41 56 4C 3F 3F 3F 3F E4 0D 51 41 4C 4C 4D 41 56 4C 3F 3F 3F 3F AA 0D"

- id: query_volume_control_svol????_0_locked
  label: "Query VOLUME CONTROL SVOL???? 0 LOCKED"
  kind: query
  query_command: "51 34 36 35 53 56 4F 4C 3F 3F 3F 3F D0 0D 51 41 4C 4C 53 56 4F 4C 3F 3F 3F 3F 96 0D"

- id: query_volume_locked_level_vlfl????_0_100_0_100
  label: "Query VOLUME LOCKED LEVEL VLFL???? 0-100 0-100"
  kind: query
  query_command: "51 34 36 35 56 4C 46 4C 3F 3F 3F 3F E0 0D 51 41 4C 4C 56 4C 46 4C 3F 3F 3F 3F A6 0D"

- id: query_remote_key_rmot????_0_enable
  label: "Query REMOTE KEY RMOT???? 0 ENABLE"
  kind: query
  query_command: "51 34 36 35 52 4D 4F 54 3F 3F 3F 3F D2 0D 51 41 4C 4C 52 4D 4F 54 3F 3F 3F 3F 98 0D"

- id: query_panel_key_panl????_0_enable
  label: "Query PANEL KEY PANL???? 0 ENABLE"
  kind: query
  query_command: "51 34 36 35 50 41 4E 4C 3F 3F 3F 3F E9 0D 51 41 4C 4C 50 41 4E 4C 3F 3F 3F 3F AF 0D"

- id: query_menu_access_menu????_0_enable
  label: "Query MENU ACCESS MENU???? 0 ENABLE"
  kind: query
  query_command: "51 34 36 35 4D 45 4E 55 3F 3F 3F 3F DF 0D 51 41 4C 4C 4D 45 4E 55 3F 3F 3F 3F A5 0D"

- id: query_av_setting_menu_avmn????_0_disable
  label: "Query AV SETTING MENU AVMN???? 0 DISABLE"
  kind: query
  query_command: "51 34 36 35 41 56 4D 4E 3F 3F 3F 3F E2 0D 51 41 4C 4C 41 56 4D 4E 3F 3F 3F 3F A8 0D"

- id: query_osd_mode_osd#????_0_enable
  label: "Query OSD MODE OSD#???? 0 ENABLE"
  kind: query
  query_command: "51 34 36 35 4F 53 44 23 3F 3F 3F 3F 0B 0D 51 41 4C 4C 4F 53 44 23 3F 3F 3F 3F D1 0D"

- id: query_input_mode_inpm????_0_locked
  label: "Query INPUT MODE INPM???? 0 LOCKED"
  kind: query
  query_command: "51 34 36 35 49 4E 50 4D 3F 3F 3F 3F E0 0D 51 41 4C 4C 49 4E 50 4D 3F 3F 3F 3F A6 0D"
```

## Variables
```yaml
# No settable parameter exists outside the enumerated Actions above.
# Scalar ranges (BRIT/CONT/COLR/TINT 0-100, SHRP 0-20, VOLM 0-100, BKLV 0-100,
# MAVL/VLFL 0-100) are carried on their parameterized set actions.
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are ACKs to
# commands or replies to explicit ???? queries.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock
# procedures. Operator note (not a source safety statement): RSET9999 performs a
# factory reset and RSTP1000/RSTA2000 reset picture/audio settings; PBTN
# (POWER OFF CONTROL MODE: AC ONLY vs ALL) governs whether power-off is honored.
```

## Notes
**Addressing / CLIENT ID.** Each frame carries a 3-byte CLIENT ID. For Smart TV units this is the last 3 bytes of the Ethernet MAC address (hex, e.g. `5FA`); for "Feature TV" units it is selected in the TV menu. `ALL` (ASCII `41 4C 4C`) is broadcast — every set responds. The source's worked examples and the generic-HEX command column use `ALL`; the per-TV column uses example ID `465`.

**Frame format (fixed length).**
- Set/Query command: `[OP 1B][CLIENT ID 3B][COMMAND 4B][DATA 4B][CHECKSUM 1B][CR 1B]` where OP is `S` (Set) or `Q` (Query).
- Acknowledgement: `[CLIENT ID 3B]:[ACK 1B][DATA 4B][CHECKSUM 1B][CR 1B]` (`:` = 0x3A).
- CHECKSUM: 8-bit sum such that the whole frame including the checksum byte totals zero. TERMINATION: CR (0x0D). COMMAND chars A–Z; DATA chars 0–9, A–Z, `#`, `?`.
- **The protocol is case sensitive** (source note 1).

**Enablement prerequisite.** Serial control is disabled by default. On the TV: Quick Settings Menu → enter `7 3 1 0` → Custom Install → set Custom Installation to Enable (this activates the RS-232 port). To allow RS-232 wake from standby, also set Power On Command (PWRE) to Enable before exiting.

**Reset/lock commands are destructive or policy-changing.** `RSET9999` (factory reset), `RSTP1000` (picture reset), `RSTA2000` (audio reset), and the lock group (`RMOT`/`PANL`/`MENU`/`AVMN`/`OSD#`/`SVOL`/`INPM`/`PBTN`) can disable local control or wipe configuration — sequence with care.

<!-- UNRESOLVED: TCP/IP control path referenced by the family hint is not documented in this source; serial is the only transport evidenced. -->
<!-- UNRESOLVED: exact model string "5U88K" taken from the task device name; the source itself names only "Hisense® Prosumer TV" and does not print the model number. -->
<!-- UNRESOLVED: firmware version compatibility, voltage/power specs, and fault/error-recovery behavior not stated in source. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-04T09:11:54.947Z
last_checked_at: 2026-06-25T17:49:52.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T17:49:52.163Z
matched_actions: 177
action_count: 177
confidence: medium
summary: "deterministic presence proof: 177/177 payloads verbatim in source; stratified Sonnet sample corroborated (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The family hint lists TCP/IP as the known protocol, but this source artifact documents RS-232C serial control only; no TCP port, base URL, or IP framing appears in the source."
- "firmware version compatibility not stated in source."
- "source contains no explicit safety warnings or interlock"
- "TCP/IP control path referenced by the family hint is not documented in this source; serial is the only transport evidenced."
- "exact model string \"5U88K\" taken from the task device name; the source itself names only \"Hisense® Prosumer TV\" and does not print the model number."
- "firmware version compatibility, voltage/power specs, and fault/error-recovery behavior not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
