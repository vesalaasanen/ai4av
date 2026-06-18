---
spec_id: admin/shure-mxa920
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXA920 Control Spec"
manufacturer: Shure
model_family: MXA920
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXA920
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXA920/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/MXA910/en-US
  - https://pubs.shure.com
  - https://pubs.shure.com/command-strings/MXA910
retrieved_at: 2026-06-15T23:33:05.415Z
last_checked_at: 2026-06-16T07:17:46.344Z
generated_at: 2026-06-16T07:17:46.344Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps:
  - "source documents MXA920 only. Other MXA family members (MXA910, MXA902, MXA710, MXA310, MXA320) have their own command-string pages and may differ in channel numbering, available commands, and parameter ranges."
  - "voltage, current, power, and physical specifications not stated in this command-string source."
  - "AEC reference input is referenced by channel index 10 and metering commands, but the source contains no AEC configuration commands."
  - "source does not document a discrete Get Error Events response payload"
  - "source does not expose a distinct variable namespace separate from commands."
  - "source documents no other named multi-step macros or preset-restore sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "source documents MXA920 only. Sibling MXA models (MXA910, MXA902, MXA710, MXA310, MXA320) have separate command-string references with different channel assignments, available commands, and parameter ranges; this spec must not be assumed to cover them."
  - "Get Error Events is listed in the auto-coverage-on/off command inventories but has no parameter/row entry in the documented command tables — its command syntax is not shown."
  - "Active Mic Channels, Solo the Automix Channel, Post-Gate Metering Rate, Automixer Gain Metering Rate are auto-coverage-OFF-only features; their exact channel-index conventions inherit from the auto-coverage-off numbering but per-product variation is not enumerated."
  - "firmware version compatibility ranges beyond \"6.6+\" for array groups are not stated."
  - "protocol version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:17:46.344Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec action units have literal command-token matches in the source; transport port 2202 and TCP are confirmed; source catalogue is fully represented by the spec. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Shure MXA920 Control Spec

## Summary
The Shure MXA920 is a ceiling-array microphone with Dante networked audio and an Ethernet command-string control port. Control is via a TCP/IP socket to port 2202 using an angle-bracket-delimited text protocol (e.g. `< SET DEVICE_AUDIO_MUTE ON >`). The spec covers device information queries, per-channel and per-coverage-area mute/gain, metering, LED behavior, DSP bypass, coverage/lobe steering, talker-position reporting for camera tracking, and array-group triangulation. This spec is derived from the MXA920 command-strings reference; the MXA920 is the current flagship of the MXA ceiling-array family.

<!-- UNRESOLVED: source documents MXA920 only. Other MXA family members (MXA910, MXA902, MXA710, MXA310, MXA320) have their own command-string pages and may differ in channel numbering, available commands, and parameter ranges. -->
<!-- UNRESOLVED: voltage, current, power, and physical specifications not stated in this command-string source. -->
<!-- UNRESOLVED: AEC reference input is referenced by channel index 10 and metering commands, but the source contains no AEC configuration commands. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable
- levelable
```

## Actions
```yaml
# All command payloads use the source's literal angle-bracket syntax verbatim.
# Index placeholders shown as {index}; the source uses a 2-digit index (01-09)
# or 0 for "all channels". Many commands behave differently depending on the
# device's Automatic Coverage setting; see Notes.
#
# Channel numbering (MXA920):
#   Automatic coverage ON:  01-08 = coverage areas, 09 = automixer output, 10 = AEC ref
#   Automatic coverage OFF: 01-08 = Dante outputs, 09 = automixer output, 10 = AEC ref

# --- Device Information ---

- id: get_all
  label: Get All
  kind: query
  command: "< GET ALL >"
  params: []
  description: "Responds with REP for all device-specific and all channel-related properties."

- id: model_query
  label: Model Query
  kind: query
  command: "< GET MODEL >"
  params: []
  description: "Returns a 32-character quoted model string, space-padded."

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "< GET SERIAL_NUM >"
  params: []
  description: "Returns a 32-character alphanumeric serial string, space-padded."

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "< GET FW_VER >"
  params: []
  description: "Returns 18-character version string (3 versions separated by '.', each 0-65535). '*' indicates invalid firmware."

- id: ip_addr_net_audio_primary_query
  label: Primary Audio Network IP Address Query
  kind: query
  command: "< GET IP_ADDR_NET_AUDIO_PRIMARY >"
  params: []
  description: "Returns 15-character dotted-quad IP address, space-padded."

- id: ip_subnet_net_audio_primary_query
  label: Primary Audio Network Subnet Mask Query
  kind: query
  command: "< GET IP_SUBNET_NET_AUDIO_PRIMARY >"
  params: []
  description: "Returns 15-character dotted-quad subnet mask, space-padded."

- id: ip_gateway_net_audio_primary_query
  label: Primary Audio Network Gateway Query
  kind: query
  command: "< GET IP_GATEWAY_NET_AUDIO_PRIMARY >"
  params: []
  description: "Returns 15-character dotted-quad gateway, space-padded."

- id: control_mac_addr_query
  label: Control MAC Address Query
  kind: query
  command: "< GET CONTROL_MAC_ADDR >"
  params: []
  description: "Returns 17-character MAC formatted as 6 octets separated by colons (e.g. 00:0E:DD:FF:F1:63)."

- id: device_id_query
  label: Device ID Query
  kind: query
  command: "< GET DEVICE_ID >"
  params: []
  description: "Returns 31-character device-ID string, space-padded."

- id: na_device_name_query
  label: Network Audio (Dante) Device Name Query
  kind: query
  command: "< GET NA_DEVICE_NAME >"
  params: []
  description: "Returns 31-character Dante device-name string, space-padded."

- id: chan_name_query
  label: Channel Name Query
  kind: query
  command: "< GET {index} CHAN_NAME >"
  params:
    - name: index
      type: integer
      description: "Channel index. Auto-coverage on: 09 (0 reports automixer output only). Auto-coverage off: 0-09."
  description: "Returns 31-character channel-name string, space-padded."

- id: na_chan_name_query
  label: Network Audio (Dante) Channel Name Query
  kind: query
  command: "< GET {index} NA_CHAN_NAME >"
  params:
    - name: index
      type: integer
      description: "Channel index. Auto-coverage on: 09 (0 reports automixer output only). Auto-coverage off: 0-09."
  description: "Returns 31-character Dante channel-name string, space-padded."

- id: set_flash_led
  label: Identify Device (Flash LED)
  kind: action
  command: "< SET FLASH {flash_state} >"
  params:
    - name: flash_state
      type: string
      description: "ON or OFF."

- id: set_preset
  label: Recall Preset
  kind: action
  command: "< SET PRESET ## >"
  params:
    - name: preset_number
      type: integer
      description: "Preset number, 1-10."
  description: "Recalls the specified preset."

- id: preset_name_query
  label: View Preset Name Query
  kind: query
  command: "< GET PRESET_NAME nn >"
  params:
    - name: nn
      type: integer
      description: "Preset number, 1-10."
  description: "Returns 25-character preset name. '{empty}' indicates an empty preset."

- id: encryption_status_query
  label: Device Encryption Status Query
  kind: query
  command: "< GET ENCRYPTION >"
  params: []
  description: "Returns encryption status: ON or OFF."

- id: restore_default_settings
  label: Restore Default Settings
  kind: action
  command: "< SET DEFAULT_SETTINGS >"
  params: []
  description: "Returns 00 on success."

- id: reboot
  label: Reboot
  kind: action
  command: "< SET REBOOT >"
  params: []
  description: "Reboots the device. Source explicitly notes: this command does not send an acknowledgement."

# --- Channel and Coverage Area Commands ---

- id: audio_clip_indicator_query
  label: Audio Clip Indicator Query
  kind: query
  command: "< GET {index} AUDIO_OUT_CLIP_INDICATOR >"
  params:
    - name: index
      type: integer
      description: "Channel index. Auto-coverage on: 09 (0 reports automixer output only). Auto-coverage off: 0-09."

- id: set_audio_gain_hi_res
  label: Set Audio Gain (Digital, Hi-Res)
  kind: action
  command: "< SET {index} AUDIO_GAIN_HI_RES {gain} >"
  params:
    - name: index
      type: integer
      description: "Channel index. Auto-coverage on: 09 (0 reports automixer output only). Auto-coverage off: 0-09. Setting gain on all channels at once (index=0) is not supported."
    - name: gain
      type: integer
      description: "0-1400, representing -110.0 dB to +30.0 dB in 0.1 dB steps (value = (dB * 10) + 1100)."
  description: "Supports SET (absolute), INC, and DEC variants; see SET_AUDIO_GAIN_HI_RES_INC / _DEC."

- id: set_audio_gain_hi_res_inc
  label: Increment Audio Gain (Hi-Res)
  kind: action
  command: "< SET {index} AUDIO_GAIN_HI_RES inc {step} >"
  params:
    - name: index
      type: integer
      description: "Channel index. See AUDIO_GAIN_HI_RES."
    - name: step
      type: integer
      description: "Increment in 0.1 dB units. Resulting gain must stay within SET range."

- id: set_audio_gain_hi_res_dec
  label: Decrement Audio Gain (Hi-Res)
  kind: action
  command: "< SET {index} AUDIO_GAIN_HI_RES dec {step} >"
  params:
    - name: index
      type: integer
      description: "Channel index. See AUDIO_GAIN_HI_RES."
    - name: step
      type: integer
      description: "Decrement in 0.1 dB units. Resulting gain must stay within SET range."

- id: set_audio_gain_postgate
  label: Set Audio Gain Postgate
  kind: action
  command: "< SET {index} AUDIO_GAIN_POSTGATE {gain} >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: gain
      type: integer
      description: "0-1400, representing -109.9 dB to +30.0 dB in 0.1 dB steps."
  description: "Automatic coverage OFF only. Supports SET, INC, DEC."

- id: set_audio_gain_postgate_inc
  label: Increment Audio Gain Postgate
  kind: action
  command: "< SET {index} AUDIO_GAIN_POSTGATE inc {step} >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer

- id: set_audio_gain_postgate_dec
  label: Decrement Audio Gain Postgate
  kind: action
  command: "< SET {index} AUDIO_GAIN_POSTGATE dec {step} >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer

- id: audio_in_rms_lvl_query
  label: Audio Level (RMS) Query
  kind: query
  command: "< GET {index} AUDIO_IN_RMS_LVL >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignment. 0 = all channels."
  description: "Returns 00-60 representing -60 to 0 dBFS."

- id: audio_in_peak_lvl_query
  label: Audio Level (Peak) Query
  kind: query
  command: "< GET {index} AUDIO_IN_PEAK_LVL >"
  params:
    - name: index
      type: integer
      description: "Channel index per Channel Number Assignment. 0 = all channels."
  description: "Returns 000-060 representing -60 to 0 dBFS."

- id: num_active_mics_query
  label: Active Mic Channels Query
  kind: query
  command: "< GET NUM_ACTIVE_MICS >"
  params: []
  description: "Returns the number of active channels. Auto-coverage OFF only."

- id: set_chan_automix_solo_en
  label: Solo Channel to Automix
  kind: action
  command: "< SET {index} CHAN_AUTOMIX_SOLO_EN {sts} >"
  params:
    - name: index
      type: integer
      description: "Mic input channel index per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: sts
      type: string
      description: "ENABLE or DISABLE."

- id: set_device_audio_mute
  label: Device Mute
  kind: action
  command: "< SET DEVICE_AUDIO_MUTE {cmd} >"
  params:
    - name: cmd
      type: string
      description: "ON, OFF, or TOGGLE."

- id: set_channel_mute
  label: Channel Mute
  kind: action
  command: "< SET {nn} AUDIO_MUTE {cmd} >"
  params:
    - name: nn
      type: integer
      description: "Channel index. Auto-coverage on: 09 (0 reports automixer output). Auto-coverage off: 0-09."
    - name: cmd
      type: string
      description: "ON, OFF, or TOGGLE."

- id: set_channel_mute_postgate
  label: Channel Mute (Post Gate)
  kind: action
  command: "< SET {nn} AUDIO_MUTE_POSTGATE {cmd} >"
  params:
    - name: nn
      type: integer
      description: "Channel index per Channel Number Assignment. Auto-coverage OFF only."
    - name: cmd
      type: string
      description: "ON, OFF, or TOGGLE."

- id: set_coverage_area_mute
  label: Coverage Area Mute
  kind: action
  command: "< SET {index} CA_MUTE {cmd} >"
  params:
    - name: index
      type: integer
      description: "Coverage area index per Channel Number Assignment. 0 = all coverage areas. Auto-coverage ON only."
    - name: cmd
      type: string
      description: "ON, OFF, or TOGGLE."
  description: "Mutes/unmutes coverage-area audio (post-gate). Auto-coverage ON only."

- id: set_coverage_area_gain
  label: Coverage Area Gain
  kind: action
  command: "< SET {index} CA_GAIN {gain} >"
  params:
    - name: index
      type: integer
      description: "Coverage area index. Setting gain for all coverage areas simultaneously is not supported. Auto-coverage ON only."
    - name: gain
      type: integer
      description: "0-1400, representing -110 dB to +30 dB in 0.1 dB steps ((dB*10)+1100)."
  description: "Coverage-area post-gate gain. Auto-coverage ON only. Supports SET, INC, DEC."

- id: set_coverage_area_gain_inc
  label: Increment Coverage Area Gain
  kind: action
  command: "< SET {index} CA_GAIN inc {step} >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer
      description: "0.1 dB step."

- id: set_coverage_area_gain_dec
  label: Decrement Coverage Area Gain
  kind: action
  command: "< SET {index} CA_GAIN dec {step} >"
  params:
    - name: index
      type: integer
    - name: step
      type: integer
      description: "0.1 dB step."

- id: set_speech_gating
  label: Speech Gating Threshold
  kind: action
  command: "< SET {nn} SPEECH_GATING {state} >"
  params:
    - name: nn
      type: integer
      description: "Automix output channel index per Channel Number Assignment."
    - name: state
      type: string
      description: "Off, Low (default), Medium, or High."

- id: set_noise_filter
  label: Enhanced Noise Filtering
  kind: action
  command: "< SET {nn} NOISE_FILTER {state} >"
  params:
    - name: nn
      type: integer
      description: "Automix output channel index per Channel Number Assignment."
    - name: state
      type: string
      description: "Off (default), Low, Medium, or High."

# --- Meter Rate Commands ---

- id: set_meter_rate
  label: Set Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE {rate} >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms, 3-5 digits. 0 = off. 1-99 invalid (returns REP ERR)."
  description: "Sets RMS metering rate. SAMPLE messages follow with channel levels 000-060 (-60 to 0 dBFS). Channel count/shape depends on Automatic Coverage setting."

- id: set_meter_rate_postgate
  label: Set Post-Gate Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_POSTGATE {rate} >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms. 0 = off. 1-99 invalid. Auto-coverage OFF only."

- id: set_meter_rate_mxr_gain
  label: Set Automixer Gain Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_MXR_GAIN {rate} >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms. 0 = off. 1-99 invalid. Auto-coverage OFF only."

- id: set_meter_rate_precomp
  label: Set Metering Rate Pre-Compressor (RMS)
  kind: action
  command: "< SET METER_RATE_PRECOMP ##### >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms. 0 = off. 1-99 invalid. SAMPLE_PRECOMP messages follow."

- id: set_meter_rate_aecref
  label: Set AEC Reference In Metering Rate (RMS)
  kind: action
  command: "< SET METER_RATE_AECREF {rate} >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms. 0 = off. 1-99 invalid. SAMPLE_AECREF messages follow."

- id: set_ca_meter_rate
  label: Set Coverage Area Metering Rate (RMS)
  kind: action
  command: "< SET CA_METER_RATE {rate} >"
  params:
    - name: rate
      type: integer
      description: "100-99999 ms. 0 = off. 1-99 invalid. Auto-coverage ON only. SAMPLE_CA reports 8 coverage-area levels."

# --- LED Status and Behavior ---

- id: dev_mute_status_led_state_query
  label: Mute LED State Query
  kind: query
  command: "< GET DEV_MUTE_STATUS_LED_STATE >"
  params: []
  description: "Returns ON (= MUTED) or OFF (= UNMUTED)."

- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  command: "< SET LED_BRIGHTNESS {level} >"
  params:
    - name: level
      type: integer
      description: "0=Disabled, 1=20%, 2=40%, 3=60%, 4=80%, 5=100%."

- id: set_led_color_unmuted
  label: Set LED Color Unmuted
  kind: action
  command: "< SET LED_COLOR_UNMUTED {color} >"
  params:
    - name: color
      type: string
      description: "RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE."

- id: set_led_color_muted
  label: Set LED Color Muted
  kind: action
  command: "< SET LED_COLOR_MUTED {color} >"
  params:
    - name: color
      type: string
      description: "RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE."

- id: set_led_state_muted
  label: Set LED State Muted
  kind: action
  command: "< SET LED_STATE_MUTED {state} >"
  params:
    - name: state
      type: string
      description: "ON, FLASHING, or OFF."

- id: set_led_state_unmuted
  label: Set LED State Unmuted
  kind: action
  command: "< SET LED_STATE_UNMUTED {state} >"
  params:
    - name: state
      type: string
      description: "ON, FLASHING, or OFF."

- id: set_dev_led_in_state
  label: Set Device LED-In State
  kind: action
  command: "< SET DEV_LED_IN_STATE {sts} >"
  params:
    - name: sts
      type: string
      description: "OFF (= Mute) or ON (= Unmute)."

# --- DSP Commands ---

- id: set_peq_filter_enable
  label: Set PEQ Filter Enable
  kind: action
  command: "< SET {index} PEQ {filter} {sts} >"
  params:
    - name: index
      type: integer
      description: "PEQ block index per Channel Number Assignment. Auto-coverage off: 01-08 (Dante outputs) + 09 (automix output). 0 = all channels."
    - name: filter
      type: integer
      description: "Filter number in the selected PEQ block. 0 = all filters."
    - name: sts
      type: string
      description: "ON, OFF, or TOGGLE."

- id: set_bypass_all_eq
  label: Set Bypass All EQ
  kind: action
  command: "< SET BYPASS_ALL_EQ {sts} >"
  params:
    - name: sts
      type: string
      description: "ON, OFF, or TOGGLE. Auto-coverage OFF only."

- id: set_bypass_intellimix
  label: Set Bypass IntelliMix
  kind: action
  command: "< SET BYPASS_IMX {sts} >"
  params:
    - name: sts
      type: string
      description: "ON, OFF, or TOGGLE. Disables/enables all IntelliMix DSP blocks. Auto-coverage OFF only."

- id: set_eq_contour
  label: Set EQ Contour
  kind: action
  command: "< SET EQ_CONTOUR {sts} >"
  params:
    - name: sts
      type: string
      description: "OFF or ON."

# --- Coverage Commands ---

- id: set_beam_width
  label: Set Lobe Width
  kind: action
  command: "< SET {index} BEAM_W {width} >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: width
      type: string
      description: "NARROW, MEDIUM, or WIDE."

- id: set_array_height
  label: Set Array Height
  kind: action
  command: "< SET ARRAY_HEIGHT {height} >"
  params:
    - name: height
      type: integer
      description: "Array height from floor in centimeters, 122-914 cm (4-30 ft), 1 cm increments. MXA920: works with auto-coverage on or off."

- id: set_auto_coverage
  label: Set Automatic Coverage
  kind: action
  command: "< SET AUTO_COVERAGE {sts} >"
  params:
    - name: sts
      type: string
      description: "On or Off."

- id: set_virtual_acoustic_boundary
  label: Set Virtual Acoustic Boundary
  kind: action
  command: "< SET VAB {value} >"
  params:
    - name: value
      type: integer
      description: "0-20, where 0 is off. Auto-coverage ON only."

# --- Camera / Talker Position Commands ---

- id: set_talker_position_rate
  label: Set Talker Position Reporting Rate
  kind: action
  command: "< SET TALKER_POSITION_RATE {rate} >"
  params:
    - name: rate
      type: integer
      description: "0=disable (default), or 100-99999 ms in 1 ms increments. 1-99 or >99999 invalid (device reports current setting). SET value 3-5 digits; REP always 5 digits (e.g. 00100)."
  description: "Controls how often SAMPLE_TALKER_POSITIONS messages are reported. Works with auto-coverage on or off."

- id: set_talker_position_sensitivity
  label: Set Talker Position Sensitivity
  kind: action
  command: "< SET TALKER_POSITION_SENSITIVITY {sensitivity} >"
  params:
    - name: sensitivity
      type: integer
      description: "Single integer selects one of three modes: Localization sensitivity (0=Medium default, 1=Low, 2=High); VAD sensitivity (4=Medium default, 5=High, 6=Lowest, 7=Low); Reflection/height correction (8=off default, 9=height on, 11=reflection+height on). Works with auto-coverage on or off."

- id: set_array_group
  label: Create / Configure Array Group
  kind: action
  command: "< SET ARRAY_GROUP devMAC(n) device_position(n) >"
  params:
    - name: members
      type: string
      description: "Up to 4 'devMAC X Y Z' triples (1-4 members). Reporter device receives the command. Positions relative to common reference point in cm (Z below ref is positive). Use 'OFF' to disable. Firmware 6.6+."
  description: "Groups 2-4 arrays for triangulation-based talker localization. MXA920: works with auto-coverage on or off."

- id: array_group_status_query
  label: Array Group Status Query
  kind: query
  command: "< GET ARRAY_GROUP_STATUS >"
  params: []
  description: "Reports per-member status: OK, CONNECTION_ERROR, PROTOCOL_ERROR, INCOMPATIBLE, TOO_FAR, or OFF. Firmware 6.6+."

- id: automix_gate_out_ca_query
  label: Automixer Gate Out Status for Coverage Areas Query
  kind: query
  command: "< GET {index} AUTOMIX_GATE_OUT_CA >"
  params:
    - name: index
      type: integer
      description: "Coverage area index per Channel Number Assignment. 0 = all coverage areas. Auto-coverage ON only."
  description: "Returns On/Off gate-out status per coverage area."

- id: automix_gate_out_ext_sig_query
  label: Automixer Gate Out Status for Lobes Query
  kind: query
  command: "< GET {index} AUTOMIX_GATE_OUT_EXT_SIG >"
  params:
    - name: index
      type: integer
      description: "Dante mic input index per Channel Number Assignment. 0 = all channels."
  description: "Returns ON/OFF gate-out signal per lobe."

- id: set_beam_x
  label: Set X-Axis Lobe Steering
  kind: action
  command: "< SET {index} BEAM_X {position} >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: position
      type: integer
      description: "0-3048 (form XXXX in REP), actual range -1524 to +1524 cm in 1 cm steps (position - 1524 = actual)."

- id: set_beam_y
  label: Set Y-Axis Lobe Steering
  kind: action
  command: "< SET {index} BEAM_Y {position} >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: position
      type: integer
      description: "0-3048, actual range -1524 to +1524 cm (position - 1524 = actual)."

- id: set_beam_z
  label: Set Z-Axis Lobe Steering
  kind: action
  command: "< SET {index} BEAM_Z {height} >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels. Auto-coverage OFF only."
    - name: height
      type: integer
      description: "0-914 cm in 1 cm steps (0-30 ft). Distance down from the array. Form xxxx in REP."

- id: set_autofocus
  label: Set Autofocus On/Off
  kind: action
  command: "< SET AUTOFOCUS {status} >"
  params:
    - name: status
      type: string
      description: "ON or OFF."

- id: beam_x_af_query
  label: Get Lobe Autofocus Position (X-Axis)
  kind: query
  command: "< GET {index} BEAM_X_AF >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels."
  description: "Returns autofocus X position, 0-3048 (actual -1524 to +1524 cm)."

- id: beam_y_af_query
  label: Get Lobe Autofocus Position (Y-Axis)
  kind: query
  command: "< GET {index} BEAM_Y_AF >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels."
  description: "Returns autofocus Y position, 0-3048 (actual -1524 to +1524 cm)."

- id: beam_z_af_query
  label: Get Lobe Autofocus Height (Z-Axis)
  kind: query
  command: "< GET {index} BEAM_Z_AF >"
  params:
    - name: index
      type: integer
      description: "Lobe number per Channel Number Assignment. 0 = all channels."
  description: "Returns autofocus Z height, 0-914 cm."

- id: set_ca_dynamic
  label: Set Dynamic Coverage Area Position
  kind: action
  command: "< SET {index} CA_DYNAMIC {position} >"
  params:
    - name: index
      type: integer
      description: "Coverage area index per Channel Number Assignment. 0 = all coverage areas. Auto-coverage ON only."
    - name: position
      type: string
      description: "Four cm coordinates 'Xmin Ymax Xmax Ymin' (each 3-4 digits in SET, always 4 digits in REP). Valid raw 0-3048 (actual -1524 to +1524 cm). Size 183x183 to 1524x1524 cm (6x6 to 50x50 ft). Max 8 areas, no overlap, center <=762 cm from device."
  description: "Sets the position of a dynamic coverage area. Auto-coverage ON only."

- id: set_ca_dedicated
  label: Set Dedicated Coverage Area Position
  kind: action
  command: "< SET {index} CA_DEDICATED {position} >"
  params:
    - name: index
      type: integer
      description: "Coverage area index per Channel Number Assignment. 0 = all coverage areas. Auto-coverage ON only."
    - name: position
      type: string
      description: "Four cm coordinates 'Xmin Ymax Xmax Ymin' (each 2-4 digits in SET, always 4 digits in REP). Valid raw 0-2377 (actual -853 to +853 cm). Size fixed 183x183 cm (6x6 ft). Max 8 areas, no overlap, center <=762 cm from device."
  description: "Sets the position of a dedicated coverage area. Auto-coverage ON only."
```

## Feedbacks
```yaml
# REP-prefixed messages are device responses to GET/SET. SAMPLE-prefixed
# messages are periodic meter/talker-position reports driven by their
# corresponding METER_RATE / TALKER_POSITION_RATE settings.
# All share the angle-bracket syntax. Representative entries:

- id: device_mute_state
  type: enum
  values: [ON, OFF]
  description: "Reported by < REP DEVICE_AUDIO_MUTE sts >."

- id: channel_mute_state
  type: enum
  values: [ON, OFF]
  description: "Reported by < REP nn AUDIO_MUTE sts > (per-channel)."

- id: audio_gain_hi_res
  type: integer
  description: "Reported by < REP index AUDIO_GAIN_HI_RES gain > (0-1400)."

- id: led_brightness
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "Reported by < REP LED_BRIGHTNESS level >."

- id: flash_led_state
  type: enum
  values: [ON, OFF]
  description: "Reported by < REP FLASH flash_state >."

- id: encryption_status
  type: enum
  values: [ON, OFF]

- id: auto_coverage_state
  type: enum
  values: [On, Off]
  description: "Reported by < REP AUTO_COVERAGE sts >."

- id: array_group_status
  type: string
  description: "Reported by < REP ARRAY_GROUP_STATUS ... >. Per-member statuses: OK, CONNECTION_ERROR, PROTOCOL_ERROR, INCOMPATIBLE, TOO_FAR, OFF."

- id: meter_rms_sample
  type: string
  description: "< SAMPLE aaa [bbb ccc ddd eee fff ggg hhh iii] > - space-separated channel RMS levels 000-060 (-60 to 0 dBFS). Channel count depends on Automatic Coverage setting."

- id: meter_precomp_sample
  type: string
  description: "< SAMPLE_PRECOMP aaa ... > - pre-compressor RMS levels per channel."

- id: meter_aecref_sample
  type: string
  description: "< SAMPLE_AECREF aaa > - AEC reference RMS level."

- id: meter_ca_sample
  type: string
  description: "< SAMPLE_CA aaa bbb ccc ddd eee fff ggg hhh > - 8 coverage-area post-gate RMS levels. Auto-coverage ON only."

- id: talker_positions_sample
  type: string
  description: "< SAMPLE TALKER_POSITIONS POSITION[1..n] > - 1..n sets of '{LobeID} {CoverageAreaID} {X Y Z} {reserved}'. Example: < SAMPLE TALKER_POSITIONS 1 2 -1524 321 914 0 2 3 123 -321 914 0 >."

- id: error_response
  type: string
  description: "< REP ERR > - generic error response returned for invalid indices, invalid values, or unsupported operations."

- id: default_settings_result
  type: integer
  description: "< REP DEFAULT_SETTINGS ## > - 00 indicates restore succeeded."

# UNRESOLVED: source does not document a discrete Get Error Events response payload
# beyond the example GET; the response format for error-event queries is not shown.
```

## Variables
```yaml
# Settable continuous parameters exposed via their own SET action above
# (AUDIO_GAIN_HI_RES, CA_GAIN, ARRAY_HEIGHT, VAB, BEAM_X/Y/Z, METER_RATE*,
# TALKER_POSITION_RATE, TALKER_POSITION_SENSITIVITY). These are documented
# as Actions per the source's command-table model rather than as a
# separate variable namespace. No additional Variables are populated.

# UNRESOLVED: source does not expose a distinct variable namespace separate from commands.
```

## Events
```yaml
# Unsolicited SAMPLE messages driven by their respective rate settings.
# Each is emitted periodically once its METER_RATE / TALKER_POSITION_RATE is
# non-zero, and stops when set to 0.

- id: meter_rate_sample_event
  description: "< SAMPLE aaa ... > emitted at the configured METER_RATE interval with per-channel RMS levels."
- id: meter_rate_postgate_sample_event
  description: "< SAMPLE aaa ... > emitted at the configured METER_RATE_POSTGATE interval. Auto-coverage OFF only."
- id: meter_rate_mxr_gain_sample_event
  description: "< SAMPLE aaa ... > emitted at the configured METER_RATE_MXR_GAIN interval. Auto-coverage OFF only."
- id: meter_rate_precomp_sample_event
  description: "< SAMPLE_PRECOMP aaa ... > emitted at the configured METER_RATE_PRECOMP interval."
- id: meter_rate_aecref_sample_event
  description: "< SAMPLE_AECREF aaa > emitted at the configured METER_RATE_AECREF interval."
- id: ca_meter_rate_sample_event
  description: "< SAMPLE_CA aaa bbb ccc ddd eee fff ggg hhh > emitted at the configured CA_METER_RATE interval. Auto-coverage ON only."
- id: talker_positions_event
  description: "< SAMPLE TALKER_POSITIONS POSITION[1..n] > emitted at the configured TALKER_POSITION_RATE interval when an active talker is detected. Persistent across power cycles."

# Array-group status updates are also pushed unsolicited when a member
# becomes reachable/unreachable or changes state:
- id: array_group_status_push
  description: "< REP ARRAY_GROUP_STATUS ... > pushed by the reporter device when a group member's connection state changes."
```

## Macros
```yaml
# Source documents one explicit multi-step sequence: setting up a 4-array
# Array Group on the reporter device (each member's MAC + relative X/Y Z
# position). See set_array_group action for the single composite command;
# the full sequence per source:
- id: array_group_setup_example
  label: Set Up 4-Array Group (Source Example)
  description: "Sends ARRAY_GROUP to the reporter device with all 4 members' MAC addresses and relative positions in cm."
  steps:
    - "< SET ARRAY_GROUP 00:0E:DD:62:A9:D9 0 0 0 00:0E:DD:50:6D:F3 366 0 0 00:0E:DD:FF:D8:EC 0 -305 0 00:0E:DD:FF:C1:5E 366 -305 0 >"
    - "< GET ARRAY_GROUP_STATUS >"

# UNRESOLVED: source documents no other named multi-step macros or preset-restore sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. The REBOOT command does not send an
# acknowledgement (per source note) but no confirmation protocol is specified.
```

## Notes
- Transport: TCP/IP socket over Ethernet to port 2202. AMX/Crestron programs should select "Client" mode. The source explicitly mentions Telnet clients (PuTTY) but instructs setting Telnet negotiation to disabled or passive — active Telnet negotiation is not supported.
- PuTTY quirk: the first command sent may return an error; re-sending it works normally.
- If using static IP addresses, set Shure Control and Audio Network settings to Manual in Designer; use the Control IP address for TCP/IP communication.
- Channel numbering differs by Automatic Coverage mode:
  - ON: 01-08 coverage areas, 09 automixer output, 10 AEC reference. Index 0 only reports the automixer output.
  - OFF: 01-08 Dante outputs, 09 automixer output, 10 AEC reference, plus per-channel post-gate variants. Index 0 = all channels.
- Many commands are gated on the Automatic Coverage mode — the source marks these explicitly (e.g. AUDIO_GAIN_POSTGATE, BEAM_X/Y/Z, BYPASS_ALL_EQ, BYPASS_IMX, CA_MUTE, CA_GAIN, CA_DYNAMIC, CA_DEDICATED, VAB, AUTOMIX_GATE_OUT_CA, CHAN_AUTOMIX_SOLO_EN, NUM_ACTIVE_MICS). Sending them in the wrong mode is expected to return `< REP ERR >`.
- Coordinate convention: X is parallel to the LED bar (square mics) or 45° to the LED bar (round mics); Y is perpendicular. Z is distance down from the array. Reported coordinates for BEAM_X/Y and TALKER_POSITION are offset by +1524 cm (50 ft) so 0 = -1524 cm.
- The command list is described as updated with each firmware release; ARRAY_GROUP and ARRAY_GROUP_STATUS require firmware 6.6 or newer.
- Error handling: `< REP ERR >` is returned for invalid indices, out-of-range values, invalid meter rates (1-99 ms), unsupported operations, and array-group configuration errors.

<!-- UNRESOLVED: source documents MXA920 only. Sibling MXA models (MXA910, MXA902, MXA710, MXA310, MXA320) have separate command-string references with different channel assignments, available commands, and parameter ranges; this spec must not be assumed to cover them. -->
<!-- UNRESOLVED: Get Error Events is listed in the auto-coverage-on/off command inventories but has no parameter/row entry in the documented command tables — its command syntax is not shown. -->
<!-- UNRESOLVED: Active Mic Channels, Solo the Automix Channel, Post-Gate Metering Rate, Automixer Gain Metering Rate are auto-coverage-OFF-only features; their exact channel-index conventions inherit from the auto-coverage-off numbering but per-product variation is not enumerated. -->
<!-- UNRESOLVED: firmware version compatibility ranges beyond "6.6+" for array groups are not stated. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->

## Provenance

```yaml
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXA920/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/MXA910/en-US
  - https://pubs.shure.com
  - https://pubs.shure.com/command-strings/MXA910
retrieved_at: 2026-06-15T23:33:05.415Z
last_checked_at: 2026-06-16T07:17:46.344Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:17:46.344Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec action units have literal command-token matches in the source; transport port 2202 and TCP are confirmed; source catalogue is fully represented by the spec. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents MXA920 only. Other MXA family members (MXA910, MXA902, MXA710, MXA310, MXA320) have their own command-string pages and may differ in channel numbering, available commands, and parameter ranges."
- "voltage, current, power, and physical specifications not stated in this command-string source."
- "AEC reference input is referenced by channel index 10 and metering commands, but the source contains no AEC configuration commands."
- "source does not document a discrete Get Error Events response payload"
- "source does not expose a distinct variable namespace separate from commands."
- "source documents no other named multi-step macros or preset-restore sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "source documents MXA920 only. Sibling MXA models (MXA910, MXA902, MXA710, MXA310, MXA320) have separate command-string references with different channel assignments, available commands, and parameter ranges; this spec must not be assumed to cover them."
- "Get Error Events is listed in the auto-coverage-on/off command inventories but has no parameter/row entry in the documented command tables — its command syntax is not shown."
- "Active Mic Channels, Solo the Automix Channel, Post-Gate Metering Rate, Automixer Gain Metering Rate are auto-coverage-OFF-only features; their exact channel-index conventions inherit from the auto-coverage-off numbering but per-product variation is not enumerated."
- "firmware version compatibility ranges beyond \"6.6+\" for array groups are not stated."
- "protocol version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
