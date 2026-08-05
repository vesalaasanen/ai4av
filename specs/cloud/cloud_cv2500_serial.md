---
spec_id: admin/cloud-cv2500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cloud CV & CVA2500 Control Spec"
manufacturer: Cloud
model_family: "CV & CVA2500"
aliases: []
compatible_with:
  manufacturers:
    - Cloud
  models:
    - "CV & CVA2500"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.co.uk
source_urls:
  - https://www.cloud.co.uk/uploads/2025/03/cv_cva_amplifier-serial-control-protocol-v1.1.pdf
  - https://www.cloud.co.uk/uploads/2024/11/cloud_cv_manual_v1.4-2.pdf
  - https://www.cloud.co.uk/uploads/2022/01/08bd061aceb8986b571682b252427845.pdf
  - https://www.cloud.co.uk
retrieved_at: 2026-07-31T10:37:11.886Z
last_checked_at: 2026-08-05T08:16:16.705Z
generated_at: 2026-08-05T08:16:16.705Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the protocol for the whole CV & CVA range (8125/4250/2500); channel-count-dependent maxima scale by model."
  - "serial flow_control not stated in source."
  - "firmware/hardware version compatibility ranges not stated in source."
  - "flow control not stated in source"
  - "no additional standalone variables documented beyond actions."
  - "no async event stream stated in source."
  - "no single-transaction macros stated in source."
  - "no explicit safety interlock procedures or power-on sequencing"
  - "firmware/hardware version compatibility not stated in source (queried at runtime via SY.SV/SY.HV)."
  - "command timing / inter-message delays not stated in source."
  - "Ethernet protocol framing (raw TCP vs telnet) over port 4999 not explicitly specified beyond \"Ethernet Interface provides serial control\"."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:16:16.705Z
  matched_actions: 162
  action_count: 162
  confidence: medium
  summary: "All 162 spec actions map to documented source commands; transport values verified; source command catalogue essentially fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-31
---

# Cloud CV & CVA2500 Control Spec

## Summary
Serial control protocol for the Cloud CV & CVA range of multi-channel digital amplifiers (this spec targets the CV & CVA2500, a 2-amplifier-channel / 2-auxiliary-channel model). Control is via an RS-232C serial interface (9600 8N1 default) and an Ethernet interface (default port 4999). The protocol addresses blocks (mono/stereo/crossover channel groupings), individual channels, line/auxiliary inputs, and the system, and covers level, mute, source, EQ (room/speaker/aux/crossover), limiting, delay, GPIO, power, and configuration.

<!-- UNRESOLVED: source documents the protocol for the whole CV & CVA range (8125/4250/2500); channel-count-dependent maxima scale by model. -->
<!-- UNRESOLVED: serial flow_control not stated in source. -->
<!-- UNRESOLVED: firmware/hardware version compatibility ranges not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 4999
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power up/down/wake commands present
  - levelable   # inferred: per-block level + multi-band EQ control present
  - queryable   # inferred: extensive query commands returning state present
```

## Actions
```yaml
# Message frame: <DESTINATION,COMMAND/>. Control messages are UPPER CASE; responses
# are lower case echoes. Destinations: SY=System, BL/Bn=Block/Block indexed,
# Cn=Channel indexed, Ln=Line input, An=Auxiliary input. Destination channels
# :HF/:LF and sub-destinations (.XH/.XL/.RE/.SE/.LI/.PF/.DY/.DB/.RS/.RC/.TX/.Gn/.HV/.SV/
# .HI/.LO/.MI/.MO/.AE/.AL/.AM/.AS/.CF/.RL/.RH/.RB/.RT/.Rn/.Sn/.SD/.EQ) per source.

# ---------- System: Power / Reset / Ping / Wake ----------
- id: power_up
  label: Power Up
  kind: action
  command: "<SY,PU/>"
  params: []

- id: power_down
  label: Power Down
  kind: action
  command: "<SY,PD/>"
  params: []

- id: power_query
  label: Power State Query
  kind: query
  command: "<SY,PQ/>"
  params: []

- id: wake_up
  label: Wake Up From Automatic Power Down
  kind: action
  command: "<SY,WU/>"
  params: []

- id: system_reset
  label: Reset To Factory Settings
  kind: action
  command: "<SY,R/>"
  params: []

- id: ping
  label: Ping
  kind: action
  command: "<SY,?/>"
  params: []

# ---------- System: Initialisation mode ----------
- id: init_factory
  label: Initialisation Mode Factory
  kind: action
  command: "<SY,IF/>"
  params: []

- id: init_previous
  label: Initialisation Mode Previous
  kind: action
  command: "<SY,IP/>"
  params: []

- id: init_query
  label: Initialisation Mode Query
  kind: query
  command: "<SY,IQ/>"
  params: []

# ---------- System: Boot Load Mode ----------
- id: bootloader_unlock
  label: Boot Load Mode Unlock
  kind: action
  command: "<SY,BU{key}/>"
  params:
    - name: key
      type: string
      description: 4 digit password key

- id: bootloader_enable
  label: Boot Load Mode Enable
  kind: action
  command: "<SY,BE/>"
  params: []

- id: bootloader_disable
  label: Boot Load Mode Disable
  kind: action
  command: "<SY,BD/>"
  params: []

- id: bootloader_lock
  label: Boot Load Mode Lock
  kind: action
  command: "<SY,BL/>"
  params: []

- id: bootloader_reset
  label: Boot Load Mode Reset
  kind: action
  command: "<SY,BR/>"
  params: []

- id: bootloader_query
  label: Boot Load Mode Query
  kind: query
  command: "<SY,BQ/>"
  params: []

# ---------- System: Password key ----------
- id: set_password
  label: Change Password
  kind: action
  command: "<SY,K{old}{new}/>"
  params:
    - name: old
      type: string
      description: 4 digit current password
    - name: new
      type: string
      description: 4 digit new password

# ---------- System: RS232 Baud ----------
- id: baud_set
  label: Set RS232 Baud Rate
  kind: action
  command: "<SY.RS,B{rate}/>"
  params:
    - name: rate
      type: integer
      description: "Baud rate (4800, 9600, 19200, 38400, 57600, 115200)"

- id: baud_query
  label: RS232 Baud Rate Query
  kind: query
  command: "<SY.RS,BQ/>"
  params: []

# ---------- System: RTC Calibration ----------
- id: rtc_enable
  label: RTC Calibration Enable
  kind: action
  command: "<SY.RC,CE/>"
  params: []

- id: rtc_disable
  label: RTC Calibration Disable
  kind: action
  command: "<SY.RC,CD/>"
  params: []

- id: rtc_increment
  label: RTC Calibration Increment
  kind: action
  command: "<SY.RC,CU{n}/>"
  params:
    - name: n
      type: integer
      description: Increment value (max 255)

- id: rtc_decrement
  label: RTC Calibration Decrement
  kind: action
  command: "<SY.RC,CD{n}/>"
  params:
    - name: n
      type: integer
      description: Decrement value (max 255)
  notes: "Source uses CD both for disable (no value) and decrement (with value)."

- id: rtc_store
  label: RTC Calibration Store To NVM
  kind: action
  command: "<SY.RC,CS/>"
  params: []

- id: rtc_query
  label: RTC Calibration Query
  kind: query
  command: "<SY.RC,Q/>"
  params: []

# ---------- System: Text Field ----------
- id: set_text
  label: Set Text Field
  kind: action
  command: "<SY.TX,S={text}/>"
  params:
    - name: text
      type: string
      description: Up to 32 ASCII characters

- id: text_query
  label: Text Field Query
  kind: query
  command: "<SY.TX,Q/>"
  params: []

# ---------- System: Versions ----------
- id: hardware_version_query
  label: Hardware Version Query
  kind: query
  command: "<SY.HV,Q/>"
  params: []

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "<SY.SV,Q/>"
  params: []

# ---------- System: GPIO (G1-G3) ----------
- id: gpio_mode_mute_in
  label: GPIO Mode Mute In
  kind: action
  command: "<SY.G{gpio},MI/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_mode_fault_out
  label: GPIO Mode Fault Out
  kind: action
  command: "<SY.G{gpio},FO/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_mode_user_in
  label: GPIO Mode User In
  kind: action
  command: "<SY.G{gpio},UI/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_mode_user_out
  label: GPIO Mode User Out
  kind: action
  command: "<SY.G{gpio},UO/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_mode_query
  label: GPIO Mode Query
  kind: query
  command: "<SY.G{gpio},MQ/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_state_set
  label: GPIO State Set
  kind: action
  command: "<SY.G{gpio},S/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_state_clear
  label: GPIO State Clear
  kind: action
  command: "<SY.G{gpio},C/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

- id: gpio_state_query
  label: GPIO State Query
  kind: query
  command: "<SY.G{gpio},SQ/>"
  params:
    - name: gpio
      type: integer
      description: GPIO terminal index (1-3)

# ---------- Block configuration (BL.CF) ----------
- id: block_config_enable
  label: Block Configuration Enable
  kind: action
  command: "<BL.CF,E/>"
  params: []

- id: block_config_disable
  label: Block Configuration Disable
  kind: action
  command: "<BL.CF,D/>"
  params: []

- id: block_config_set
  label: Block Configuration Set
  kind: action
  command: "<BL.CF,C={tokens}/>"
  params:
    - name: tokens
      type: string
      description: "Comma separated config tokens (DM, ST, 2WM, 2WSM, 2WSS)"

- id: block_config_query_all
  label: Block Configuration Query (All)
  kind: query
  command: "<BL.CF,Q/>"
  params: []

- id: block_config_query_single
  label: Block Configuration Query (Single Block)
  kind: query
  command: "<B{block}.CF,Q/>"
  params:
    - name: block
      type: integer
      description: Block index (1-based)

# ---------- Block indexed: Level ----------
- id: level_absolute
  label: Set Block Level (Absolute)
  kind: action
  command: "<B{block},L{level}/>"
  params:
    - name: block
      type: integer
      description: Block index (1-based)
    - name: level
      type: integer
      description: Attenuation in dB (0 to 90)

- id: level_up
  label: Block Level Up
  kind: action
  command: "<B{block},LU{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer
      description: dB increase

- id: level_down
  label: Block Level Down
  kind: action
  command: "<B{block},LD{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer
      description: dB decrease

- id: level_query
  label: Block Level Query
  kind: query
  command: "<B{block},LQ/>"
  params:
    - name: block
      type: integer

- id: level_parser_enable
  label: Block Level Parser Control Enable
  kind: action
  command: "<B{block},LE/>"
  params:
    - name: block
      type: integer

- id: level_parser_disable
  label: Block Level Parser Control Disable
  kind: action
  command: "<B{block},LX/>"
  params:
    - name: block
      type: integer

# ---------- Block indexed: Mute / Open ----------
- id: mute
  label: Mute Block
  kind: action
  command: "<B{block},M/>"
  params:
    - name: block
      type: integer

- id: unmute
  label: Unmute Block (Open)
  kind: action
  command: "<B{block},O/>"
  params:
    - name: block
      type: integer

- id: mute_query
  label: Block Mute State Query
  kind: query
  command: "<B{block},Q/>"
  params:
    - name: block
      type: integer

# ---------- Block indexed: Source ----------
- id: source_set
  label: Set Block Source
  kind: action
  command: "<B{block},S{src}/>"
  params:
    - name: block
      type: integer
    - name: src
      type: integer
      description: "Line input 1-8, or 0 for none"

- id: source_stereo_sum
  label: Source Stereo Sum
  kind: action
  command: "<B{block},SS/>"
  params:
    - name: block
      type: integer

- id: source_mono
  label: Source Mono (Stereo Sum Off)
  kind: action
  command: "<B{block},SM/>"
  params:
    - name: block
      type: integer

- id: source_auxiliary
  label: Source From Auxiliary Inputs
  kind: action
  command: "<B{block},SA/>"
  params:
    - name: block
      type: integer

- id: source_line
  label: Source From Line Inputs
  kind: action
  command: "<B{block},SL/>"
  params:
    - name: block
      type: integer

- id: source_query
  label: Block Source Query
  kind: query
  command: "<B{block},SQ/>"
  params:
    - name: block
      type: integer

- id: source_parser_enable
  label: Source Parser Control Enable
  kind: action
  command: "<B{block},SE/>"
  params:
    - name: block
      type: integer

- id: source_parser_disable
  label: Source Parser Control Disable
  kind: action
  command: "<B{block},SX/>"
  params:
    - name: block
      type: integer

# ---------- Block indexed: Invert (phase) ----------
- id: invert_enable
  label: Output Invert Enable
  kind: action
  command: "<B{block},IE/>"
  params:
    - name: block
      type: integer

- id: invert_disable
  label: Output Invert Disable
  kind: action
  command: "<B{block},ID/>"
  params:
    - name: block
      type: integer

- id: invert_query
  label: Output Invert Query
  kind: query
  command: "<B{block},IQ/>"
  params:
    - name: block
      type: integer

# ---------- Block indexed: Line Voltage (CV Amplifier only) ----------
- id: line_voltage_70
  label: Line Voltage 70V
  kind: action
  command: "<B{block},V70/>"
  params:
    - name: block
      type: integer

- id: line_voltage_100
  label: Line Voltage 100V
  kind: action
  command: "<B{block},V100/>"
  params:
    - name: block
      type: integer

- id: line_voltage_query
  label: Line Voltage Query
  kind: query
  command: "<B{block},VQ/>"
  params:
    - name: block
      type: integer

- id: line_voltage_parser_enable
  label: Line Voltage Parser Control Enable
  kind: action
  command: "<B{block},VE/>"
  params:
    - name: block
      type: integer

- id: line_voltage_parser_disable
  label: Line Voltage Parser Control Disable
  kind: action
  command: "<B{block},VD/>"
  params:
    - name: block
      type: integer

# ---------- Name labels (Block / Line / Aux) ----------
- id: name_set_block
  label: Set Block Name Label
  kind: action
  command: "<B{block},N={name}/>"
  params:
    - name: block
      type: integer
    - name: name
      type: string
      description: Up to 16 chars (cannot contain "/>")

- id: name_query_block
  label: Query Block Name Label
  kind: query
  command: "<B{block},NQ/>"
  params:
    - name: block
      type: integer

- id: name_set_line
  label: Set Line Input Name Label
  kind: action
  command: "<L{input},N={name}/>"
  params:
    - name: input
      type: integer
      description: Line input index (1-8)
    - name: name
      type: string

- id: name_query_line
  label: Query Line Input Name Label
  kind: query
  command: "<L{input},NQ/>"
  params:
    - name: input
      type: integer

- id: name_set_aux
  label: Set Auxiliary Input Name Label
  kind: action
  command: "<A{input},N={name}/>"
  params:
    - name: input
      type: integer
      description: Auxiliary input index (1-8)
    - name: name
      type: string

- id: name_query_aux
  label: Query Auxiliary Input Name Label
  kind: query
  command: "<A{input},NQ/>"
  params:
    - name: input
      type: integer

# ---------- Room EQ (enable + shelves + bass/treble + indexed bands) ----------
- id: room_eq_enable
  label: Room EQ Enable
  kind: action
  command: "<B{block}.RE,E/>"
  params:
    - name: block
      type: integer

- id: room_eq_disable
  label: Room EQ Disable
  kind: action
  command: "<B{block}.RE,D/>"
  params:
    - name: block
      type: integer

- id: room_eq_query
  label: Room EQ Enable State Query
  kind: query
  command: "<B{block}.RE,Q/>"
  params:
    - name: block
      type: integer

- id: room_eq_low_shelf_frequency
  label: Room EQ Low Shelf Frequency
  kind: action
  command: "<B{block}.RL,F{freq}/>"
  params:
    - name: block
      type: integer
    - name: freq
      type: integer
      description: Frequency in Hz (10-20000)

- id: room_eq_low_shelf_boost
  label: Room EQ Low Shelf Boost
  kind: action
  command: "<B{block}.RL,B{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer
      description: Boost in dB (0-12)

- id: room_eq_low_shelf_cut
  label: Room EQ Low Shelf Cut
  kind: action
  command: "<B{block}.RL,C{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer
      description: Cut in dB (0-12)

- id: room_eq_low_shelf_query
  label: Room EQ Low Shelf Query
  kind: query
  command: "<B{block}.RL,Q/>"
  params:
    - name: block
      type: integer

- id: room_eq_high_shelf_frequency
  label: Room EQ High Shelf Frequency
  kind: action
  command: "<B{block}.RH,F{freq}/>"
  params:
    - name: block
      type: integer
    - name: freq
      type: integer

- id: room_eq_high_shelf_boost
  label: Room EQ High Shelf Boost
  kind: action
  command: "<B{block}.RH,B{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_high_shelf_cut
  label: Room EQ High Shelf Cut
  kind: action
  command: "<B{block}.RH,C{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_high_shelf_query
  label: Room EQ High Shelf Query
  kind: query
  command: "<B{block}.RH,Q/>"
  params:
    - name: block
      type: integer

- id: room_eq_bass_boost
  label: Room EQ Bass Boost
  kind: action
  command: "<B{block}.RB,B{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_bass_cut
  label: Room EQ Bass Cut
  kind: action
  command: "<B{block}.RB,C{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_bass_query
  label: Room EQ Bass Query
  kind: query
  command: "<B{block}.RB,Q/>"
  params:
    - name: block
      type: integer

- id: room_eq_treble_boost
  label: Room EQ Treble Boost
  kind: action
  command: "<B{block}.RT,B{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_treble_cut
  label: Room EQ Treble Cut
  kind: action
  command: "<B{block}.RT,C{db}/>"
  params:
    - name: block
      type: integer
    - name: db
      type: integer

- id: room_eq_treble_query
  label: Room EQ Treble Query
  kind: query
  command: "<B{block}.RT,Q/>"
  params:
    - name: block
      type: integer

- id: room_eq_band_frequency
  label: Room EQ Band Frequency
  kind: action
  command: "<B{block}.R{band},F{freq}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
      description: EQ band (1-7)
    - name: freq
      type: integer

- id: room_eq_band_q
  label: Room EQ Band Q
  kind: action
  command: "<B{block}.R{band},Q{q}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: q
      type: number
      description: Q value (e.g. 0.8)

- id: room_eq_band_boost
  label: Room EQ Band Boost
  kind: action
  command: "<B{block}.R{band},B{db}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: db
      type: integer

- id: room_eq_band_cut
  label: Room EQ Band Cut
  kind: action
  command: "<B{block}.R{band},C{db}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: db
      type: integer

- id: room_eq_band_query
  label: Room EQ Band Query
  kind: query
  command: "<B{block}.R{band},Q/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer

# ---------- Speaker EQ ----------
- id: speaker_eq_enable
  label: Speaker EQ Enable
  kind: action
  command: "<B{block}.SE,E/>"
  params:
    - name: block
      type: integer

- id: speaker_eq_disable
  label: Speaker EQ Disable
  kind: action
  command: "<B{block}.SE,D/>"
  params:
    - name: block
      type: integer

- id: speaker_eq_query
  label: Speaker EQ Enable State Query
  kind: query
  command: "<B{block}.SE,Q/>"
  params:
    - name: block
      type: integer

- id: speaker_eq_band_frequency
  label: Speaker EQ Band Frequency
  kind: action
  command: "<B{block}.S{band},F{freq}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
      description: Speaker EQ band (1-5)
    - name: freq
      type: integer
  notes: "Destination channel (:HF/:LF) required when block is a crossover."

- id: speaker_eq_band_q
  label: Speaker EQ Band Q
  kind: action
  command: "<B{block}.S{band},Q{q}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: q
      type: number

- id: speaker_eq_band_boost
  label: Speaker EQ Band Boost
  kind: action
  command: "<B{block}.S{band},B{db}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: db
      type: integer

- id: speaker_eq_band_cut
  label: Speaker EQ Band Cut
  kind: action
  command: "<B{block}.S{band},C{db}/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer
    - name: db
      type: integer

- id: speaker_eq_band_query
  label: Speaker EQ Band Query
  kind: query
  command: "<B{block}.S{band},Q/>"
  params:
    - name: block
      type: integer
    - name: band
      type: integer

# ---------- Speaker Protect High Pass Filter ----------
- id: protect_filter_parser_enable
  label: Protect Filter Parser Control Enable
  kind: action
  command: "<B{block}.PF,PE/>"
  params:
    - name: block
      type: integer

- id: protect_filter_parser_disable
  label: Protect Filter Parser Control Disable
  kind: action
  command: "<B{block}.PF,PX/>"
  params:
    - name: block
      type: integer

- id: protect_filter_enable
  label: Protect Filter Enable
  kind: action
  command: "<B{block}.PF,E/>"
  params:
    - name: block
      type: integer

- id: protect_filter_disable
  label: Protect Filter Disable
  kind: action
  command: "<B{block}.PF,D/>"
  params:
    - name: block
      type: integer

- id: protect_filter_frequency
  label: Protect Filter Frequency
  kind: action
  command: "<B{block}.PF,F{freq}/>"
  params:
    - name: block
      type: integer
    - name: freq
      type: integer

- id: protect_filter_query
  label: Protect Filter Query
  kind: query
  command: "<B{block}.PF,Q/>"
  params:
    - name: block
      type: integer

# ---------- Limiter ----------
- id: limiter_enable
  label: Limiter Enable
  kind: action
  command: "<B{block}.LI,E/>"
  params:
    - name: block
      type: integer

- id: limiter_disable
  label: Limiter Disable
  kind: action
  command: "<B{block}.LI,D/>"
  params:
    - name: block
      type: integer

- id: limiter_threshold
  label: Limiter Threshold
  kind: action
  command: "<B{block}.LI,T{threshold}/>"
  params:
    - name: block
      type: integer
    - name: threshold
      type: integer
      description: dB below 0dB

- id: limiter_gain_reduction_query
  label: Limiter Gain Reduction Query
  kind: query
  command: "<B{block}.LI,GQ/>"
  params:
    - name: block
      type: integer

- id: limiter_query
  label: Limiter Query
  kind: query
  command: "<B{block}.LI,Q/>"
  params:
    - name: block
      type: integer

# ---------- Crossover High / Low (XH / XL) ----------
- id: crossover_bessel
  label: Crossover Slope Bessel
  kind: action
  command: "<B{block}.{xover},BE{n}/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string
      description: "XH or XL"
    - name: n
      type: integer
      description: "dB/oct (12, 18, 24)"

- id: crossover_butterworth
  label: Crossover Slope Butterworth
  kind: action
  command: "<B{block}.{xover},BU{n}/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string
    - name: n
      type: integer
      description: "dB/oct (12, 18, 24)"

- id: crossover_linkwitz_riley
  label: Crossover Slope Linkwitz Riley
  kind: action
  command: "<B{block}.{xover},LR{n}/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string
    - name: n
      type: integer
      description: "dB/oct (12, 24, 36, 48)"

- id: crossover_frequency
  label: Crossover Frequency
  kind: action
  command: "<B{block}.{xover},F{freq}/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string
    - name: freq
      type: integer

- id: crossover_overlap_enable
  label: Crossover Overlap Enable
  kind: action
  command: "<B{block}.{xover},OE/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string

- id: crossover_overlap_disable
  label: Crossover Overlap Disable
  kind: action
  command: "<B{block}.{xover},OD/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string

- id: crossover_query
  label: Crossover Query
  kind: query
  command: "<B{block}.{xover},Q/>"
  params:
    - name: block
      type: integer
    - name: xover
      type: string

# ---------- Crossover EQ Balance (HF/LF) ----------
- id: crossover_eq_balance_level
  label: Crossover EQ Balance Level
  kind: action
  command: "<B{block}:{chan}.EQ,L{n}/>"
  params:
    - name: block
      type: integer
    - name: chan
      type: string
      description: "HF or LF"
    - name: n
      type: integer
      description: Balance level

- id: crossover_eq_balance_query
  label: Crossover EQ Balance Query
  kind: query
  command: "<B{block}:{chan}.EQ,LQ/>"
  params:
    - name: block
      type: integer
    - name: chan
      type: string

# ---------- Speaker Delay (HF/LF) ----------
- id: speaker_delay_set
  label: Speaker Alignment Delay Set
  kind: action
  command: "<B{block}:{chan}.SD,U{us}/>"
  params:
    - name: block
      type: integer
    - name: chan
      type: string
      description: "HF or LF"
    - name: us
      type: integer
      description: Microseconds (1-30000)

- id: speaker_delay_query
  label: Speaker Alignment Delay Query
  kind: query
  command: "<B{block}:{chan}.SD,UQ/>"
  params:
    - name: block
      type: integer
    - name: chan
      type: string

# ---------- Delay (assigned) ----------
- id: block_delay_query
  label: Block Assigned Delay Query
  kind: query
  command: "<B{block}.DY,MQ/>"
  params:
    - name: block
      type: integer

- id: block_delay_down
  label: Block Assigned Delay Down
  kind: action
  command: "<B{block}.DY,MD{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer
      description: ms decrement

- id: block_delay_up
  label: Block Assigned Delay Up
  kind: action
  command: "<B{block}.DY,MU{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer
      description: ms increment

- id: system_total_delay_query
  label: System Total Assigned Delay Query
  kind: query
  command: "<SY.DY,MQ/>"
  params: []

- id: system_delay_reset
  label: System Delay Reset
  kind: action
  command: "<SY.DY,R/>"
  params: []

# ---------- Delay Build ----------
- id: delay_build_new
  label: Delay Build New
  kind: action
  command: "<SY.DB,N/>"
  params: []

- id: delay_build_reset
  label: Delay Build Reset / Cancel
  kind: action
  command: "<SY.DB,R/>"
  params: []

- id: delay_build_reserve
  label: Delay Build Reserve For Block
  kind: action
  command: "<B{block}.DB,M{ms}/>"
  params:
    - name: block
      type: integer
    - name: ms
      type: integer
      description: Milliseconds to reserve

- id: delay_build_reserve_query
  label: Delay Build Reserved Query For Block
  kind: query
  command: "<B{block}.DB,MQ/>"
  params:
    - name: block
      type: integer

- id: delay_build_available_query
  label: Delay Build Available Query
  kind: query
  command: "<SY.DB,AQ/>"
  params: []

- id: delay_build_set
  label: Delay Build Set (Activate)
  kind: action
  command: "<SY.DB,S/>"
  params: []

# ---------- Auxiliary EQ (aux-only blocks) ----------
- id: aux_eq_disable
  label: Auxiliary EQ Disable
  kind: action
  command: "<B{block}.AE,D/>"
  params:
    - name: block
      type: integer

- id: aux_eq_high_pass
  label: Auxiliary EQ High Pass
  kind: action
  command: "<B{block}.AE,HP/>"
  params:
    - name: block
      type: integer

- id: aux_eq_low_pass
  label: Auxiliary EQ Low Pass
  kind: action
  command: "<B{block}.AE,LP/>"
  params:
    - name: block
      type: integer

- id: aux_eq_frequency
  label: Auxiliary EQ Frequency
  kind: action
  command: "<B{block}.AE,F{freq}/>"
  params:
    - name: block
      type: integer
    - name: freq
      type: integer

- id: aux_eq_bessel
  label: Auxiliary EQ Bessel
  kind: action
  command: "<B{block}.AE,BE{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer

- id: aux_eq_butterworth
  label: Auxiliary EQ Butterworth
  kind: action
  command: "<B{block}.AE,BU{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer

- id: aux_eq_linkwitz_riley
  label: Auxiliary EQ Linkwitz Riley
  kind: action
  command: "<B{block}.AE,LR{n}/>"
  params:
    - name: block
      type: integer
    - name: n
      type: integer

- id: aux_eq_query
  label: Auxiliary EQ Query
  kind: query
  command: "<B{block}.AE,Q/>"
  params:
    - name: block
      type: integer

# ---------- Auxiliary Slaving (aux-only blocks) ----------
- id: aux_level_slave_enable
  label: Auxiliary Level Slave Enable
  kind: action
  command: "<B{block}.AL,SE/>"
  params:
    - name: block
      type: integer

- id: aux_level_slave_disable
  label: Auxiliary Level Slave Disable
  kind: action
  command: "<B{block}.AL,SD/>"
  params:
    - name: block
      type: integer

- id: aux_level_slave_query
  label: Auxiliary Level Slave Query
  kind: query
  command: "<B{block}.AL,SQ/>"
  params:
    - name: block
      type: integer

- id: aux_mute_slave_enable
  label: Auxiliary Mute Slave Enable
  kind: action
  command: "<B{block}.AM,SE/>"
  params:
    - name: block
      type: integer

- id: aux_mute_slave_disable
  label: Auxiliary Mute Slave Disable
  kind: action
  command: "<B{block}.AM,SD/>"
  params:
    - name: block
      type: integer

- id: aux_mute_slave_query
  label: Auxiliary Mute Slave Query
  kind: query
  command: "<B{block}.AM,SQ/>"
  params:
    - name: block
      type: integer

- id: aux_source_slave_set_master
  label: Auxiliary Source Slave Set Master
  kind: action
  command: "<B{block}.AS,S{master}/>"
  params:
    - name: block
      type: integer
    - name: master
      type: integer
      description: Master block index

- id: aux_source_slave_enable
  label: Auxiliary Source Slave Enable
  kind: action
  command: "<B{block}.AS,SE/>"
  params:
    - name: block
      type: integer

- id: aux_source_slave_disable
  label: Auxiliary Source Slave Disable
  kind: action
  command: "<B{block}.AS,SD/>"
  params:
    - name: block
      type: integer

- id: aux_source_slave_query
  label: Auxiliary Source Slave Query
  kind: query
  command: "<B{block}.AS,SQ/>"
  params:
    - name: block
      type: integer

# ---------- Channel indexed: Meters ----------
- id: input_meter_query
  label: Input Meter Query
  kind: query
  command: "<C{channel}.MI,Q/>"
  params:
    - name: channel
      type: integer
      description: Channel index (1-based)

- id: output_meter_query
  label: Output Meter Query
  kind: query
  command: "<C{channel}.MO,Q/>"
  params:
    - name: channel
      type: integer

# ---------- Channel indexed: Hi Impedance (CVA only) ----------
- id: hi_impedance_70
  label: High-Impedance 70V
  kind: action
  command: "<C{channel}.HI,V70/>"
  params:
    - name: channel
      type: integer

- id: hi_impedance_100
  label: High-Impedance 100V
  kind: action
  command: "<C{channel}.HI,V100/>"
  params:
    - name: channel
      type: integer

- id: hi_impedance_query
  label: High-Impedance Mode Query
  kind: query
  command: "<C{channel}.HI,Q/>"
  params:
    - name: channel
      type: integer

# ---------- Channel indexed: Low Impedance (CVA only) ----------
- id: low_impedance_4
  label: Low-Impedance 4 Ohm
  kind: action
  command: "<C{channel}.LO,I4/>"
  params:
    - name: channel
      type: integer

- id: low_impedance_8
  label: Low-Impedance 8 Ohm
  kind: action
  command: "<C{channel}.LO,I8/>"
  params:
    - name: channel
      type: integer

- id: low_impedance_16
  label: Low-Impedance 16 Ohm
  kind: action
  command: "<C{channel}.LO,I16/>"
  params:
    - name: channel
      type: integer

- id: low_impedance_query
  label: Low-Impedance Mode Query
  kind: query
  command: "<C{channel}.LO,Q/>"
  params:
    - name: channel
      type: integer
```

## Feedbacks
```yaml
# Response messages are lower-case echoes of the sent control message followed by
# the resulting value(s). Error messages use "!X" identifiers (see Notes).
- id: level_response
  type: numeric
  description: "Lower-case echo, e.g. <b1,l9/> returns absolute level"

- id: power_state_response
  type: enum
  values: [pe, pd]
  description: "Power query returns pe (enabled) or pd (disabled), plus socket state e/d"

- id: error_response
  type: enum
  values: ["!B", "!E", "!I", "!N", "!A", "!P", "!T", "!U"]
  description: "Error identifier sequences (buffer/execution/interrupted/nvm/overrun/parse/token/unavailable)"
```

## Variables
```yaml
# Settable continuous parameters are represented as parameterized Actions above
# (level, EQ frequency/Q/boost/cut, limiter threshold, delay times, etc.).
# UNRESOLVED: no additional standalone variables documented beyond actions.
```

## Events
```yaml
# No unsolicited notifications documented; the CV & CVA amplifier replies only to
# control messages. Fault condition is signalled via GPIO Fault Out mode only.
# UNRESOLVED: no async event stream stated in source.
```

## Macros
```yaml
# The Delay Build procedure (new -> reserve per block -> set) is a multi-step
# sequence documented in source, but expressed here as its constituent actions.
# UNRESOLVED: no single-transaction macros stated in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (not asserted as enforced interlocks):
# - Block configuration must be enabled (BL.CF,E) before changes; enable state
#   times out after 60 seconds.
# - Changing block configuration deletes all assigned delays and speaker delays.
# - Boot Load enable/disable requires unlock with the 4-digit password key.
# - Boot Load Reset restarts the amplifier in bootloader mode.
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements beyond the above operational notes are stated in source.
```

## Notes
- Control messages are UPPER CASE; all response messages are lower case (except label query responses which return the label string verbatim).
- Message frame is `<DESTINATION,COMMAND/>`. The header `<` resets the decoder (discards partial messages); `/>` terminates and triggers decode/execute.
- Destination field = optional main dest + optional `:dest_channel` (HF/LF) + optional `.sub_destination`.
- Block = a set of channels controlled together (mono/stereo/crossover). Factory default: every channel is a mono block.
- Max blocks/channels scale by model: 8125 = 10 blocks/10 channels, 4250 = 6/6, 2500 = 4/4 (amp channels + 2 aux).
- `SY.RS,Bn` changes baud rate AFTER the response is transmitted — use with caution over RS-232.
- Source uses `CD` for both RTC Calibration Disable (no value) and RTC Calibration Decrement (with value); disambiguate by presence of a numeric value.
- CVA-only commands (Hi/Lo Impedance) do not apply to CV models; CV-only commands (Line Voltage) do not apply to CVA models.
- Eight error types: Buffer Full `!B`, Execution `!E`, Interrupted `!I`, NVM not ready `!N`, Overrun `!A`, Parse `!P`, Token `!T`, Unavailable `!U`.

<!-- UNRESOLVED: serial flow_control not stated in source. -->
<!-- UNRESOLVED: firmware/hardware version compatibility not stated in source (queried at runtime via SY.SV/SY.HV). -->
<!-- UNRESOLVED: command timing / inter-message delays not stated in source. -->
<!-- UNRESOLVED: Ethernet protocol framing (raw TCP vs telnet) over port 4999 not explicitly specified beyond "Ethernet Interface provides serial control". -->
```

## Provenance

```yaml
source_domains:
  - cloud.co.uk
source_urls:
  - https://www.cloud.co.uk/uploads/2025/03/cv_cva_amplifier-serial-control-protocol-v1.1.pdf
  - https://www.cloud.co.uk/uploads/2024/11/cloud_cv_manual_v1.4-2.pdf
  - https://www.cloud.co.uk/uploads/2022/01/08bd061aceb8986b571682b252427845.pdf
  - https://www.cloud.co.uk
retrieved_at: 2026-07-31T10:37:11.886Z
last_checked_at: 2026-08-05T08:16:16.705Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:16:16.705Z
matched_actions: 162
action_count: 162
confidence: medium
summary: "All 162 spec actions map to documented source commands; transport values verified; source command catalogue essentially fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the protocol for the whole CV & CVA range (8125/4250/2500); channel-count-dependent maxima scale by model."
- "serial flow_control not stated in source."
- "firmware/hardware version compatibility ranges not stated in source."
- "flow control not stated in source"
- "no additional standalone variables documented beyond actions."
- "no async event stream stated in source."
- "no single-transaction macros stated in source."
- "no explicit safety interlock procedures or power-on sequencing"
- "firmware/hardware version compatibility not stated in source (queried at runtime via SY.SV/SY.HV)."
- "command timing / inter-message delays not stated in source."
- "Ethernet protocol framing (raw TCP vs telnet) over port 4999 not explicitly specified beyond \"Ethernet Interface provides serial control\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
