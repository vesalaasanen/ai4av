---
spec_id: admin/ashly-audio-nxe1-54
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio nXe1.54 Control Spec"
manufacturer: "Ashly Audio"
model_family: nXe1.54
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - nXe1.54
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nXe-amp-2U-datasheet-Mar-2026.pdf
  - https://ashly.com/ethernet-communications/
retrieved_at: 2026-07-14T18:07:37.380Z
last_checked_at: 2026-07-21T20:19:46.577Z
generated_at: 2026-07-21T20:19:46.577Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "OPT_PAD (0xF9)"
  - "the protocol doc is shared across Ashly NE family; nXe1.54 is a 4-channel 2-rack-unit amplifier without DSP per vendor product page, so DSP-only options (OPT_DSP_FUNC_PARAMS, OPT_DSP_FUNC_METERS, FUNC_*) and CobraNet-only options may not apply. This spec enumerates the full protocol as documented; implementers should verify per-feature applicability on the actual nXe1.54."
  - "default admin password not stated in source"
  - "no multi-step macro sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing procedures documented in the Ethernet protocol source. The fault log (OPT_FAULT_LOG) reports protect/thermal/rail faults as events but does not specify user-facing safety procedures."
  - "power-on sequencing for nXe1.54 not documented in this Ethernet protocol doc. nXe series product page (prior reconnaissance) notes DHCP enabled out of the box and INA-1 RS-232 converter as an option, but INA-1 / WR5 RS-232 protocol is a separate document not included here."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:19:46.577Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions, both header framing servers and per-option get/set commands, match the source's option table and byte layouts verbatim; only undocumented OPT_PAD (0xF9) is unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Ashly Audio nXe1.54 Control Spec

## Summary

The Ashly Audio nXe1.54 is a network-enabled multi-channel power amplifier (nXe series) that communicates via UDP/IP on a standard Ethernet network. This spec covers the Ashly "Protocol for Ethernet Communications" (revision 5.3) which all Ashly Network Enabled (NE) products share, including the nXe amplifier family. Devices are addressed by MAC address and use three logical servers on UDP port 3100: Get Parameter (read state, header 0x8F), Set Parameter (modify state with ack, header 0xAA), and Request Updates (subscribe to dynamic updates, header 0x55). Messages carry a list of typed "Options" terminated by OPT_END (0xFF).

<!-- UNRESOLVED: the protocol doc is shared across Ashly NE family; nXe1.54 is a 4-channel 2-rack-unit amplifier without DSP per vendor product page, so DSP-only options (OPT_DSP_FUNC_PARAMS, OPT_DSP_FUNC_METERS, FUNC_*) and CobraNet-only options may not apply. This spec enumerates the full protocol as documented; implementers should verify per-feature applicability on the actual nXe1.54. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 3100
auth:
  type: password  # Set Parameter Server requires user name + password; default user "default" has no password
  # UNRESOLVED: default admin password not stated in source
```

## Traits
```yaml
- powerable      # inferred from OPT_STANDBY (power on/off)
- queryable      # inferred from Get Parameter Server and OPT_DEVICE_INFO etc.
- routable       # inferred from OPT_INPUT_SOURCE
- levelable      # inferred from OPT_ATTENUATION, OPT_GAIN_INC_DEC
```

## Actions
```yaml
# Header / framing operations on the three logical servers.
- id: get_parameter_request
  label: Get Parameter Request
  kind: query
  command: "0x8F 0x8F 0x8F 0x8F {dest_mac[6]} 0x00 0x00 0x00 0x00 0xFF"  # header 0x8F, request=0, source=working, reserved, then options+OPT_END; sample request bytes 1-14 are 0x8F x4 + MAC[6] + 0x00 + 0x00 + 0x00 + 0x00
  notes: |
    Header bytes 1-4 = 0x8F (Get Parameter Server).
    Byte 11 = request/reply (0x00 = request).
    Byte 12 = source (0x00 = Working Settings).
    Bytes 13-14 reserved (0x00).
    Followed by option payload terminated with 0xFF (OPT_END).
    Sent to UDP port 3100. May be broadcast; dest MAC in header selects target.

- id: set_parameter_request
  label: Set Parameter Request
  kind: action
  command: "0xAA 0xAA 0xAA 0xAA {dest_mac[6]} {username[8]} {password[8]} {msg_num[2]} 0x00 0x00 {options...} 0xFF"
  notes: |
    Header bytes 1-4 = 0xAA (Set Parameter Server).
    Bytes 5-10 = destination MAC.
    Bytes 11-18 = user name (null-padded to 8 bytes; "default" or "admin").
    Bytes 19-26 = password (null-padded to 8 bytes; ignored for "default" user).
    Bytes 27-28 = 16-bit message number (circular counter 0-65535).
    Byte 29 = ack status (0x00 = original message).
    Byte 30 = reserved (0x00).
    Followed by option payload terminated with 0xFF (OPT_END).
    Sent to UDP port 3100. Device replies with ack to originating port.

- id: request_updates_subscribe
  label: Request Updates Subscribe
  kind: action
  command: "0x55 0x55 0x55 0x55 {dest_mac[6]} {timeout_ms[2]} 0x00 0x00 0x00 0x00 {client_port[2]} 0x00 0x00 0xFF"
  notes: |
    Header bytes 1-4 = 0x55 (Request Updates Server).
    Bytes 5-10 = destination MAC.
    Bytes 11-12 = timeout (MSB, LSB) in ms before re-subscribe required.
    Bytes 13-16 = reserved (0x00).
    Bytes 17-18 = client UDP port to receive updates on (MSB, LSB).
    Bytes 19-20 = reserved (0x00).
    Followed by END_OPT (0xFF) - payload otherwise unused.
    Sent to UDP port 3100.

# Per-option actions. Each option is one opcode; the 3 server types share the option set.

# --- OPT_MUTE (0x02): mute/unmute a single input or output channel ---
- id: opt_mute_get
  label: Get Mute Status (OPT_MUTE)
  kind: query
  command: "0x02 0x02 {channel_type} {channel_num} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Output Channel (incl. amplifier channels), 1 = Input Channel
    - name: channel_num
      type: integer
      description: 0-23 = Channels 1-24
  notes: Returns current mute state via Get Parameter reply.

- id: opt_mute_set
  label: Set Mute (OPT_MUTE)
  kind: action
  command: "0x02 0x03 {channel_type} {channel_num} {state} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Output, 1 = Input
    - name: channel_num
      type: integer
      description: 0-23 = Channels 1-24
    - name: state
      type: integer
      description: 0x00 = Mute Off (unmuted), 0x01 = Mute On (muted)

# --- OPT_CHANNEL_NAME (0x04) ---
- id: opt_channel_name_get
  label: Get Channel Name (OPT_CHANNEL_NAME)
  kind: query
  command: "0x04 0x16 {channel_type} {channel_num} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Output, 1 = Input
    - name: channel_num
      type: integer
      description: 0-23 = Channels 1-24

- id: opt_channel_name_set
  label: Set Channel Name (OPT_CHANNEL_NAME)
  kind: action
  command: "0x04 0x16 {channel_type} {channel_num} {name[20]} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Output, 1 = Input
    - name: channel_num
      type: integer
      description: 0-23 = Channels 1-24
    - name: name
      type: string
      description: 20 ASCII chars (0x20-0x7A and 0x00), left-justified, pad with 0x00

# --- OPT_AMP_MODE (0x05): read-only ---
- id: opt_amp_mode_get
  label: Get Amp Mode (OPT_AMP_MODE)
  kind: query
  command: "0x05 0x02 0x00 0x00 0xFF"
  notes: |
    Amp Model (byte aa): 1=800, 2=1200, 3=1800, 4=2400, 5=3000, 6=3800, 7=4250, 8=8250, 9=4070, 10=8070. Read-only.
    Amp Mode (byte bb): 0=Stereo, 1=Bridged Mono, 2=Parallel Mono. Bitwise 4/8/16 = BM channels 3-4/5-6/7-8.
    PM not valid on multichannel amps. Amp Mode settable only via rear-panel switch.

# --- OPT_POWER_STATUS (0x06): read-only ---
- id: opt_power_status_get
  label: Get Power Status (OPT_POWER_STATUS)
  kind: query
  command: "0x06 0x01 0x00 0xFF"
  notes: Status byte: 1 = Standby Power Only, 0 = Power On.

# --- OPT_ATTENUATION (0x09): per-amp-channel attenuator + polarity + link group ---
- id: opt_attenuation_set
  label: Set Attenuation (OPT_ATTENUATION)
  kind: action
  command: "0x09 0x06 {channel_type} {channel} {attenuation} {polarity} {link_group} {offset} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Amp Channel (only supported value)
    - name: channel
      type: integer
      description: 0-1 = Amp Channels 1 & 2
    - name: attenuation
      type: integer
      description: 0-40 = 0 to -40 dB in 1 dB steps; 41-255 = off (mute, typically 255)
    - name: polarity
      type: integer
      description: 0 = normal, 1-255 = inverted
    - name: link_group
      type: integer
      description: 0 = None, 1-8 = Link Group 1-8
    - name: offset
      type: integer
      description: Link offset: 0-40 = 0 to -40 dB, 41-255 = off

- id: opt_attenuation_get
  label: Get Attenuation (OPT_ATTENUATION)
  kind: query
  command: "0x09 0x06 0x00 {channel} 0x00 0x00 0x00 0x00 0xFF"

# --- OPT_GAIN_INC_DEC (0x0A): gain increment/decrement ---
- id: opt_gain_inc_dec
  label: Gain Increment/Decrement (OPT_GAIN_INC_DEC)
  kind: action
  command: "0x0A 0x04 {channel_type} {channel} {direction} {amount} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Amp Channel/Output, 1 = Input
    - name: channel
      type: integer
      description: Channel number
    - name: direction
      type: integer
      description: 0 = Decrement (quieter), 1 = Increment (louder)
    - name: amount
      type: integer
      description: 0 = 0.5 dB (not valid for attenuators), 1 = 1.0 dB, 2 = 2.0 dB, 3 = 3.0 dB

# --- OPT_STANDBY (0x0D): read/write standby and front-panel disable ---
- id: opt_standby_set
  label: Set Standby (OPT_STANDBY)
  kind: action
  command: "0x0D 0x01 {state} 0xFF"
  params:
    - name: state
      type: integer
      description: 0 = On, 1 = standby
  notes: |
    Length may be 1 (omit front-panel disable) or 2 (include it):
    command_len1: "0x0D 0x01 {state} 0xFF"
    command_len2: "0x0D 0x02 {state} {fp_disable} 0xFF"  where fp_disable 0=enabled, 1=disabled

- id: opt_standby_get
  label: Get Standby (OPT_STANDBY)
  kind: query
  command: "0x0D 0x00 0xFF"
  notes: Reply always includes both standby state and front-panel disable (length 2).

# --- OPT_INPUT_CONFIG (0x0F): PE DSP input card only ---
- id: opt_input_config_set
  label: Set Input Configuration (OPT_INPUT_CONFIG)
  kind: action
  command: "0x0F 0x01 {config} 0xFF"
  params:
    - name: config
      type: integer
      description: 0=Analog 48k, 1=Analog 96k, 2=AES3 44.1k, 3=AES3 48k, 4=AES3 88.2k, 5=AES3 96k, 6=AES3+Analog Backup 48k, 7=AES3+Analog Backup 96k
  notes: PE DSP Input only (not supported on NE series).

- id: opt_input_config_get
  label: Get Input Configuration (OPT_INPUT_CONFIG)
  kind: query
  command: "0x0F 0x01 0x00 0xFF"

# --- OPT_DVCA_LEVEL (0x10) ---
- id: opt_dvca_level_set
  label: Set DVCA Level (OPT_DVCA_LEVEL)
  kind: action
  command: "0x10 {dvca_num} {mute} {gain[2]} 0xFF"
  params:
    - name: dvca_num
      type: integer
      description: 0-3 = DVCAs 1-4
    - name: mute
      type: integer
      description: 0 = unmuted, 1-0xFF = muted
    - name: gain
      type: integer
      description: -50 to +12 dB encoded as 7792 to 8312 (.1 dB steps); 0 = off

- id: opt_dvca_level_get
  label: Get DVCA Level (OPT_DVCA_LEVEL)
  kind: query
  command: "0x10 0x00 0x00 0x00 0x00 0xFF"

# --- OPT_DVCA_LINK_GROUP (0x11) ---
- id: opt_dvca_link_group_set
  label: Set DVCA Link Group (OPT_DVCA_LINK_GROUP)
  kind: action
  command: "0x11 0x02 {dvca_num} {link_group} 0xFF"
  params:
    - name: dvca_num
      type: integer
      description: 0-3 = DVCAs 1-4
    - name: link_group
      type: integer
      description: 0 = None, 1-8 = Link Groups 1-8

- id: opt_dvca_link_group_get
  label: Get DVCA Link Group (OPT_DVCA_LINK_GROUP)
  kind: query
  command: "0x11 0x02 {dvca_num} 0x00 0xFF"

# --- OPT_DVCA_NAME (0x12) ---
- id: opt_dvca_name_set
  label: Set DVCA Name (OPT_DVCA_NAME)
  kind: action
  command: "0x12 0x15 {dvca_num} {name[20]} 0xFF"
  params:
    - name: dvca_num
      type: integer
      description: 0-3 = DVCAs 1-4
    - name: name
      type: string
      description: 20 ASCII chars (0x20-0x7A and 0x00), left-justified, pad 0x00

- id: opt_dvca_name_get
  label: Get DVCA Name (OPT_DVCA_NAME)
  kind: query
  command: "0x12 0x15 {dvca_num} 0xFF"

# --- OPT_COBRANET_RECEIVER (0x16): PE CobraNet / NE series ---
- id: opt_cobranet_receiver_set
  label: Set CobraNet Receiver Bundle (OPT_COBRANET_RECEIVER)
  kind: action
  command: "0x16 0x03 {rx_num} {bundle[2]} 0xFF"
  params:
    - name: rx_num
      type: integer
      description: 0-3 = Receivers A-D
    - name: bundle
      type: integer
      description: 16-bit; 0=None, 1-255 Multicast, 256-65279 Unicast, 65280-65535 Private

- id: opt_cobranet_receiver_get
  label: Get CobraNet Receiver Bundle (OPT_COBRANET_RECEIVER)
  kind: query
  command: "0x16 0x03 {rx_num} 0x00 0x00 0xFF"

# --- OPT_COBRANET_RECEIVER_MAP (0x17) ---
- id: opt_cobranet_receiver_map_set
  label: Set CobraNet Receiver Map (OPT_COBRANET_RECEIVER_MAP)
  kind: action
  command: "0x17 0x03 {audio_output_ch} {rx_num} {sub_channel} 0xFF"
  params:
    - name: audio_output_ch
      type: integer
      description: CobraNet audio output channel (ARChannel + 33). For PE Amp use 0 & 1 as channels 1 & 2
    - name: rx_num
      type: integer
      description: 0 = None, 1-8 = Receivers 1-8
    - name: sub_channel
      type: integer
      description: 0-7 = Sub Index 1-8

- id: opt_cobranet_receiver_map_get
  label: Get CobraNet Receiver Map (OPT_COBRANET_RECEIVER_MAP)
  kind: query
  command: "0x17 0x03 {audio_output_ch} 0x00 0x00 0xFF"

# --- OPT_INPUT_SOURCE (0x18) ---
- id: opt_input_source_set
  label: Set Input Source (OPT_INPUT_SOURCE)
  kind: action
  command: "0x18 0x03 {channel_type} {audio_channel} {source} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Outputs, 1 = Inputs (set 0 for PE amps)
    - name: audio_channel
      type: integer
      description: 0 & 1 = Channels 1 & 2; 0 to x-1 = Channels 1 to x
    - name: source
      type: integer
      description: 0=None, 1=Analog, 2=AES, 3=Network Audio (CobraNet), 16=AES w/Analog Backup, 17=CobraNet w/Analog Backup, 32=Auto Mode (Net, AES, Analog)

- id: opt_input_source_get
  label: Get Input Source (OPT_INPUT_SOURCE)
  kind: query
  command: "0x18 0x03 {channel_type} {audio_channel} 0x00 0xFF"
  notes: PE MultiChannel & NE Rackmount replies include 4th byte with current audio source.

# --- OPT_LOGIC_BLOCK (0x19): NE Rackmount ---
- id: opt_logic_block_set
  label: Set Logic Block (OPT_LOGIC_BLOCK)
  kind: action
  command: "0x16 0x0A {block_num} {direction} {pin1_func} {pin1_param} {pin2_func} {pin2_param} {pin3_func} {pin3_param} {pin4_func} {pin4_param} 0xFF"
  notes: |
    Source lists option byte as 0x16 in this row but logic block id is 0x19 (likely a doc typo - protocol id 0x19 retained).
    Length 10 bytes; up to 4 pins per block, all same direction.
    direction: 0 = Output, 1 = Input.
    pin_func: 0 = No Function, 1 = Input preset / Output GPO.

- id: opt_logic_block_get
  label: Get Logic Block (OPT_LOGIC_BLOCK)
  kind: query
  command: "0x19 0x0A {block_num} 0xFF"

# --- OPT_COBRANET_TX (0x1A): NE Rackmount ---
- id: opt_cobranet_tx_set
  label: Set CobraNet Transmitter (OPT_COBRANET_TX)
  kind: action
  command: "0x1A 0x04 {tx_num} {tx_bundle[2]} {tx_format} 0xFF"
  params:
    - name: tx_num
      type: integer
      description: 0-3 = Transmitters A-D
    - name: tx_bundle
      type: integer
      description: 16-bit; 0=None, 1-255 Multicast, 256-65279 Unicast, 65280-65535 Private
    - name: tx_format
      type: integer
      description: 0x04=16-bit, 0x05=20-bit, 0x06=24-bit

- id: opt_cobranet_tx_get
  label: Get CobraNet Transmitter (OPT_COBRANET_TX)
  kind: query
  command: "0x1A 0x04 {tx_num} 0x00 0x00 0x00 0xFF"

# --- OPT_COBRANET_TX_MAP (0x1B) ---
- id: opt_cobranet_tx_map_set
  label: Set CobraNet Transmitter Map (OPT_COBRANET_TX_MAP)
  kind: action
  command: "0x1B 0x03 {audio_input_ch} {tx_num} {sub_channel} 0xFF"
  params:
    - name: audio_input_ch
      type: integer
      description: CobraNet audio input channel (ARChannel). For NE Rackmount use 1-8
    - name: tx_num
      type: integer
      description: 0 = None, 1-8 = Transmitters 1-8
    - name: sub_channel
      type: integer
      description: 0-7 = Sub Index 1-8

- id: opt_cobranet_tx_map_get
  label: Get CobraNet Transmitter Map (OPT_COBRANET_TX_MAP)
  kind: query
  command: "0x1B 0x03 {audio_input_ch} 0x00 0x00 0xFF"

# --- OPT_LOGIC_PIN (0x1C): NE series with logic outputs ---
- id: opt_logic_pin_set
  label: Set Logic Pin (OPT_LOGIC_PIN)
  kind: action
  command: "0x1C 0x02 {pin_number} {state} 0xFF"
  params:
    - name: pin_number
      type: integer
      description: Pin number relative to all pins in the box
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON

# --- OPT_FR_CONFIG (0x25): FR remotes only ---
- id: opt_fr_config_set
  label: Set FR Remote Config (OPT_FR_CONFIG)
  kind: action
  command: "0x25 0x13 0x00 {brightness} {lockout_status_r/o} {target_username[8]} {target_password[8]} 0xFF"
  params:
    - name: brightness
      type: integer
      description: 0=Quarter, 1=Half, 2=Three Quarter, 3=Full
    - name: target_username
      type: string
      description: 8-byte null-padded target user name
    - name: target_password
      type: string
      description: 8-byte null-padded target password

- id: opt_fr_config_get
  label: Get FR Remote Config (OPT_FR_CONFIG)
  kind: query
  command: "0x25 0x13 0x00 0x00 0x00 0xFF"
  notes: Reply byte bb is read-only fader count + lockout status.

# --- OPT_FR_FADER_CONFIG (0x26): per-fader FR remote config ---
- id: opt_fr_fader_config_set
  label: Set FR Fader Config (OPT_FR_FADER_CONFIG)
  kind: action
  command: "0x26 0x15 {fader_num} {fader_mode} {target_mac[6]} {channel_type} {channel_num} {sub_ch_a} {master_enable} {fader_low[2]} {fader_high[2]} {meter_low[2]} {meter_high[2]} {sub_ch_b} 0xFF"
  params:
    - name: fader_num
      type: integer
      description: 0-based fader number
    - name: fader_mode
      type: integer
      description: 0=Disabled, 1=Mixer, 2=I/O Level, 3=Source Select
    - name: target_mac
      type: string
      description: 6-byte target MAC address
    - name: channel_type
      type: integer
      description: 0=Output, 1=Input
    - name: channel_num
      type: integer
      description: 0-based channel number
    - name: sub_ch_a
      type: integer
      description: Mixer channel / Source Select "A" channel
    - name: master_enable
      type: integer
      description: 0 = not affected by Master, 1 = affected
    - name: fader_low
      type: integer
      description: 16-bit; low dB (dB*10+8192). Range 7692 (-50 dB) to 8312 (+12 dB)
    - name: fader_high
      type: integer
      description: 16-bit; high dB encoded same way
    - name: meter_low
      type: integer
      description: 16-bit; meter threshold low (dBu*10+8192). Range 7892 (-30 dBu) to 8392 (+20 dBu)
    - name: meter_high
      type: integer
      description: 16-bit; meter threshold high encoded same way
    - name: sub_ch_b
      type: integer
      description: Source Select "B" channel

- id: opt_fr_fader_config_get
  label: Get FR Fader Config (OPT_FR_FADER_CONFIG)
  kind: query
  command: "0x26 0x15 {fader_num} 0xFF"

# --- OPT_RTC (0x2D): NE series with RTC events ---
- id: opt_rtc_set
  label: Set RTC (OPT_RTC)
  kind: action
  command: "0x2D 0x08 {dst} {year} {month} {day} {hour} {minute} {second} {day_of_week} 0xFF"
  params:
    - name: dst
      type: integer
      description: 0 = no auto DST adjust, 1 = auto DST adjust
    - name: year
      type: integer
      description: 0-99 = 2000-2099
    - name: month
      type: integer
      description: 1-12
    - name: day
      type: integer
      description: 1-31
    - name: hour
      type: integer
      description: 0-23 (0=midnight)
    - name: minute
      type: integer
      description: 0-59
    - name: second
      type: integer
      description: 0-59
    - name: day_of_week
      type: integer
      description: 1-7 = Monday-Sunday

- id: opt_rtc_get
  label: Get RTC (OPT_RTC)
  kind: query
  command: "0x2D 0x08 0xFF"

# --- OPT_RTC_EVENT (0x2E) ---
- id: opt_rtc_event_set
  label: Set RTC Event (OPT_RTC_EVENT)
  kind: action
  command: "0x2E 0x23 {event_num} {event_name[20]} {event_type} {hour} {minute} {day_mask} {channel_type} {channel} {param1[4]} {param2[4]} 0xFF"
  params:
    - name: event_num
      type: integer
      description: 0-99
    - name: event_name
      type: string
      description: 20-char null-padded
    - name: event_type
      type: integer
      description: 0=None, 1=Preset Recall, 2=Power State Change, 3=Mute Change, 4=Source Change, 5=Level Change (WR5)
    - name: hour
      type: integer
      description: 0-23
    - name: minute
      type: integer
      description: 0-59
    - name: day_mask
      type: integer
      description: Bitwise day mask; bit 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun, 7=N/A
    - name: channel_type
      type: integer
      description: 0=output, 1=input
    - name: channel
      type: integer
      description: 0 to max channel -1
    - name: param1
      type: integer
      description: Type-dependent (see OPT_RTC_EVENT description)
    - name: param2
      type: integer
      description: Type-dependent

- id: opt_rtc_event_get
  label: Get RTC Event (OPT_RTC_EVENT)
  kind: query
  command: "0x2E 0x23 {event_num} 0xFF"

# --- OPT_FAULT_LOG (0x2F): NE series with fault logs ---
- id: opt_fault_log_get
  label: Get Fault Log Entry (OPT_FAULT_LOG)
  kind: query
  command: "0x2F {length} {fault_num[2]} {fault_type} {event_time[6]} {event_channel} {event_desc[30]} {data_length} {data...} 0xFF"
  params:
    - name: fault_num
      type: integer
      description: 16-bit 0 to max faults
    - name: fault_type
      type: integer
      description: 0=None, 1=Amp Thermal, 2=Amp Protect, 3=Amp Supply Protect, 4=Amp Fuse, 5=Amp Rail, 6=Amp Power On/Off, 7=DSP, 8=Memory, 9=Network, 10=Network Audio, 11=Host uC, 12=Security Change, 13=Time Change
  notes: Length and trailing fields vary by fault.

- id: opt_fault_log_clear
  label: Clear Fault Log (OPT_FAULT_LOG)
  kind: action
  command: "0x2F 0x02 0xFF 0xAA 0xFF"
  notes: Set fault number to 0xFFAA to clear log.

# --- OPT_PRESET_INFO (0x30) ---
- id: opt_preset_info_get
  label: Get Preset Info (OPT_PRESET_INFO)
  kind: query
  command: "0x30 0x15 {preset_number} 0xFF"
  params:
    - name: preset_number
      type: integer
      description: 0=Working Preset, 1-X=Preset 1-X, 0xFF=Temp Preset

- id: opt_preset_info_set
  label: Set Preset Name (OPT_PRESET_INFO)
  kind: action
  command: "0x30 0x15 {preset_number} {name[20]} {sub_preset} 0xFF"
  params:
    - name: name
      type: string
      description: 20-char null-padded
    - name: sub_preset
      type: integer
      description: 0 = not sub, 1-255 = sub preset (only on PE Multi/NE Rackmount)

# --- OPT_PRESET_RECALL (0x32): PE DSP Input ---
- id: opt_preset_recall
  label: Recall Preset (OPT_PRESET_RECALL)
  kind: action
  command: "0x32 0x02 {preset_number} {mute_outputs} 0xFF"
  params:
    - name: preset_number
      type: integer
      description: 1-X (preset number)
    - name: mute_outputs
      type: integer
      description: 0 = not forced mute, 1-0xFF = force mute outputs
  notes: PE DSP Input only.

# --- OPT_PRESET_SAVE (0x31): PE DSP Input ---
- id: opt_preset_save
  label: Save Preset (OPT_PRESET_SAVE)
  kind: action
  command: "0x31 0x02 {preset_number} {source} 0xFF"
  params:
    - name: preset_number
      type: integer
      description: 0 to X-1
    - name: source
      type: integer
      description: 0 = Working Preset, 1 = Temp Preset
  notes: PE DSP Input only.

# --- OPT_DEVICE_MODIFIED (0x33): PC-receive only ---
- id: opt_device_modified
  label: Device Modified Event (OPT_DEVICE_MODIFIED)
  kind: event
  command: "0x33 0x00 0xFF"
  notes: Sent to PC by device; tells PC to re-request all parameters. Optional preset_number byte (length=1) on Preset Recall.

# --- OPT_TOTAL_PRESETS (0x34): PC-receive only ---
- id: opt_total_presets
  label: Total Presets (OPT_TOTAL_PRESETS)
  kind: query
  command: "0x34 0x03 0x00 0x00 0x00 0xFF"
  notes: Reply: byte 3 sub-presets supported (0=no, 1-255=yes); byte 4 total presets (0=none, 1-255=count); byte 5 current working preset number.

# --- OPT_METER_INPUT (0x40): PE Standard/CobraNet Input Card ---
- id: opt_meter_input_get
  label: Get Input Meter (OPT_METER_INPUT)
  kind: query
  command: "0x40 0x04 {channel_type} {channel} 0x00 0x00 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0 = Amp Channel
    - name: channel
      type: integer
      description: 0 = Channel 1, 1 = Channel 2
  notes: Reply includes clip byte and input meter value.

# --- OPT_METER_OUTPUT (0x41): all PE Input cards ---
- id: opt_meter_output_get
  label: Get Output Meter (OPT_METER_OUTPUT)
  kind: query
  command: "0x41 {length} 0x00 {channel} 0xFF"
  params:
    - name: channel
      type: integer
      description: 0-1 = Amp Channels 1 & 2
  notes: Reply: clip byte (0/1), output meter (0-40 = dB down from clip).

# --- OPT_METER_TEMP (0x42): PE amps ---
- id: opt_meter_temp_get
  label: Get Temperature Meter (OPT_METER_TEMP)
  kind: query
  command: "0x42 {length} 0x00 {channel} 0xFF"
  notes: Reply: 0-1023 = 0 degC to 94 degC linear.

# --- OPT_METER_CURRENT (0x43): PE amps ---
- id: opt_meter_current_get
  label: Get Current Meter (OPT_METER_CURRENT)
  kind: query
  command: "0x43 {length} 0x00 {channel} 0xFF"
  notes: Reply: 0-1023 current value.

# --- OPT_METER_ATTENS (0x45): PE amps ---
- id: opt_meter_attens_get
  label: Get Attenuator Meters (OPT_METER_ATTENS)
  kind: query
  command: "0x45 {length} 0x00 {channel} 0xFF"
  notes: Reply includes front-panel and rear-panel attenuation bytes. 41-255 = MUTE.

# --- OPT_CHANNEL_PROTECT (0x46): PE amps ---
- id: opt_channel_protect_get
  label: Get Channel Protect Status (OPT_CHANNEL_PROTECT)
  kind: query
  command: "0x46 0x03 0x00 {channel} 0xFF"
  notes: Protect byte: 0=Not in protect, 1-0xFF=in protect. Always false while in standby.

# --- OPT_AES_RECEIVER (0x47) ---
- id: opt_aes_receiver_get
  label: Get AES Receiver Status (OPT_AES_RECEIVER)
  kind: query
  command: "0x47 0x03 0x00 0x00 0x00 0xFF"
  notes: |
    AES Frequency: 0=44.1k, 2=48k, 3=32k, 4=22k, 5=11k, 6=24k, 7=16k, 8=88.2k, 9=8k, 10=96k, 11=64k, 12=176.4k, 14=192k, 15-255=Invalid.
    Error code bitwise: 0x01=PARITY, 0x02=NON_AUD, 0x04=FREQ_CHNG, 0x08=INVALID, 0x10=UNLOCK, 0x20=FREQ_MISMATCH, 0x40=NON_PCM, 0x80=MCLK_FAIL, 0x00=NONE.

# --- OPT_LOGIC_STATE (0x48): NE Rackmount ---
- id: opt_logic_state_get
  label: Get Logic Pin States (OPT_LOGIC_STATE)
  kind: query
  command: "0x48 0x05 {block_num} 0xFF"
  notes: Reply: 4 pin state bytes for the block.

# --- OPT_WORDCLOCK_STATUS (0x49): NE Rackmount ---
- id: opt_wordclock_status_get
  label: Get Wordclock Status (OPT_WORDCLOCK_STATUS)
  kind: query
  command: "0x49 0x02 0x00 0x00 0xFF"
  notes: Reply: lock status byte + detected sampling rate byte.

# --- OPT_AMP_METER_PROTECT (0x4A): NE amplifiers ---
- id: opt_amp_meter_protect_get
  label: Get Amp Protect Status (OPT_AMP_METER_PROTECT)
  kind: query
  command: "0x4A 0x05 0x00 0x00 0x00 0x00 0x00 0xFF"
  notes: Reply: channel protect, channel thermal, fuse protect, rail fault, supply protect.

# --- OPT_AMP_GAIN_SETTING (0x4B): NE amplifiers ---
- id: opt_amp_gain_setting_get
  label: Get Amp Gain Switch (OPT_AMP_GAIN_SETTING)
  kind: query
  command: "0x4A 0x01 0x00 0xFF"
  notes: Returns gain switch setting byte. (Doc lists option as 0x4A; option id 0x4B retained.)

# --- OPT_REMOTE_RD8C (0x50): RD8C, FR-8/16 ---
- id: opt_remote_rd8c_get
  label: Get Remote Fader Levels (OPT_REMOTE_RD8C)
  kind: query
  command: "0x50 0x15 0x00 0xFF"
  notes: |
    Length 9 (RD8C) or 21 (FR-8/16). Reply includes up to 16 fader levels in 0.5 dB steps (0-124 = 0-62 dB).
    For FR-8/16 also master button + per-channel button bit array.

# --- OPT_REMOTE_LEV (0x53): NE Rackmount ---
- id: opt_remote_lev_get
  label: Get Remote Rear-Panel Levels (OPT_REMOTE_LEV)
  kind: query
  command: "0x50 0x09 0xFF"
  notes: 8 rear-panel attenuator levels, 0-102 = 0-51 dB in 0.5 dB steps. (Doc lists option as 0x50; option id 0x53 retained.)

# --- OPT_DEVICE_NAME (0x6E) ---
- id: opt_device_name_get
  label: Get Device Name (OPT_DEVICE_NAME)
  kind: query
  command: "0x6E 0x14 0xFF"

- id: opt_device_name_set
  label: Set Device Name (OPT_DEVICE_NAME)
  kind: action
  command: "0x6E 0x14 {name[20]} 0xFF"
  params:
    - name: name
      type: string
      description: 20 ASCII chars (0x20-0x7A and 0x00), left-justified, pad 0x00

# --- OPT_DEVICE_GROUP (0x6F) ---
- id: opt_device_group_get
  label: Get Device Group (OPT_DEVICE_GROUP)
  kind: query
  command: "0x6F 0x14 0xFF"

- id: opt_device_group_set
  label: Set Device Group (OPT_DEVICE_GROUP)
  kind: action
  command: "0x6F 0x14 {group[20]} 0xFF"

# --- OPT_ILL_FRONT (0x70): PE Series Amp Inputs ---
- id: opt_ill_front
  label: Illuminate Front Panel COM LED (OPT_ILL_FRONT)
  kind: action
  command: "0x70 0x01 0x01 0xFF"
  notes: zz 0x01-0xFF turns on COM LED for a few seconds. Write-only.

# --- OPT_DEVICE_INFO (0x71): read-only ---
- id: opt_device_info_get
  label: Get Device Info (OPT_DEVICE_INFO)
  kind: query
  command: "0x71 0x02 0x00 0x00 0xFF"
  notes: |
    Reply variant 1 (length=2): device type + firmware revision.
    Reply variant 2 (length=3): + hardware options.
    Reply variant 3 (length=3+model byte): + model (for products with hardware options).
    Device types: 0x06=ne24.24M, 0x08=Std PE, 0x09=DSP PE, 0x0B=CobraNet PE, 0x0C=WR5, 0x0E=NE Rackmount*, 0x10=NE MultiChannel (4250/4070/8250/8070)*.

# --- OPT_COBRANET_INFO (0x78): PE Amp CobraNet ---
- id: opt_cobranet_info_get
  label: Get CobraNet Info (OPT_COBRANET_INFO)
  kind: query
  command: "0x78 0xXX 0xFF"
  notes: Reply includes firmware major/minor/protocol, 6-byte MAC, and description string.

# --- OPT_COBRANET_STATUS (0x79): PE Amp CobraNet ---
- id: opt_cobranet_status_get
  label: Get CobraNet Status (OPT_COBRANET_STATUS)
  kind: query
  command: "0x79 0x0E 0xFF"
  notes: |
    Reply (14 bytes): conductor status, current interface, interface 1 & 2 status, mode status, error status, error code.
    Conductor: 0=Not Conductor, 1=Conductor.

# --- OPT_COBRANET_RX_STATUS (0x7A): PE Amp CobraNet ---
- id: opt_cobranet_rx_status_get
  label: Get CobraNet Rx Status (OPT_COBRANET_RX_STATUS)
  kind: query
  command: "0x7A 0x03 {rx_num} 0xFF"
  notes: Reply: rx status, sub-bundle format.

# --- OPT_DSP_FUNC_PARAMS (0x81): PE DSP Input Card (nXe series applicability UNRESOLVED) ---
- id: opt_dsp_func_params_set
  label: Set DSP Function Parameters (OPT_DSP_FUNC_PARAMS)
  kind: action
  command: "0x81 {length} {channel_type} {channel} {function_id} {params...} 0xFF"
  params:
    - name: channel_type
      type: integer
      description: 0=Output, 1=Input (2-0xFF undefined)
    - name: channel
      type: integer
      description: DSP channel (0-23 = 1-24)
    - name: function_id
      type: integer
      description: |
        0x00=NONE, 0x01=GEQ28, 0x02=SIG_GEN, 0x03=AUTOLEV, 0x04=DUCKER, 0x05=LIMITER, 0x06=GATE,
        0x07=PEQ2, 0x08=PEQ4, 0x09=PEQ6, 0x0A=PEQ10, 0x0B=PEQ15, 0x0C=PEQ15, 0x0F=HPF, 0x10=LPF,
        0x11=DELAY_BASE, 0x12=DELAY_EXTRA, 0x13=MIXER_X_IN, 0x17=GAIN, 0x1A=METER, 0x1F=CLIP_LIMITER,
        0x20=GEQ31, 0x21=WR5_LEVEL, 0x22=REMOTE_LEVEL, 0x25=PREAMP, 0x26=FBS_CTRL, 0x28=ANC,
        0x64=GAIN_VCA_ASSIGNMENT
    - name: params
      type: string
      description: Function-specific parameters (length-dependent); see DSP Sub-Functions tables

- id: opt_dsp_func_params_get
  label: Get DSP Function Parameters (OPT_DSP_FUNC_PARAMS)
  kind: query
  command: "0x81 {length} {channel_type} {channel} {function_id} 0xFF"

# --- OPT_DSP_FUNC_METERS (0x82) ---
- id: opt_dsp_func_meters_get
  label: Get DSP Function Meters (OPT_DSP_FUNC_METERS)
  kind: query
  command: "0x82 {length} {channel_type} {channel} {function_id} 0xFF"

# --- OPT_DSP_CHANNEL_METER (0x88): PE DSP Input ---
- id: opt_dsp_channel_meter_get
  label: Get DSP Channel Meter (OPT_DSP_CHANNEL_METER)
  kind: query
  command: "0x88 0x08 {channel_type} {channel} 0x00 0x00 0x00 0x00 0x00 0xFF"
  notes: Reply: meter format, clip byte, 32-bit IEEE float meter (1.0 = +20 dBu; 0 = -Inf).

# --- EXTENSION: FUNC_MIXER_MUTE (0x74): independent per-channel mute ---
- id: func_mixer_mute
  label: Mixer Mute (FUNC_MIXER_MUTE)
  kind: action
  command: "0x81 0x0B 0x00 {mixer_channel} 0x74 {mute_mask[4]} {unmute_mask[4]} 0xFF"
  params:
    - name: mixer_channel
      type: integer
      description: DSP channel 0-23 with the mixer you want to control
    - name: mute_mask
      type: integer
      description: 32-bit bitmask; bit N=1 mutes channel (N+1). 0 = no channels muted.
    - name: unmute_mask
      type: integer
      description: 32-bit bitmask; bit N=1 unmutes channel (N+1). 0 = no channels unmuted.
  notes: DSP channel type must be 0 (output mixer).

# --- EXTENSION: FUNC_MIXER_GAIN (0x75): independent per-channel level ---
- id: func_mixer_gain
  label: Mixer Gain (FUNC_MIXER_GAIN)
  kind: action
  command: "0x81 0x09 0x00 {mixer_channel} 0x75 {channel_mask[4]} {level[2]} 0xFF"
  params:
    - name: mixer_channel
      type: integer
      description: DSP channel 0-23 with the mixer you want to control
    - name: channel_mask
      type: integer
      description: 32-bit bitmask; bit N=1 sets channel (N+1) to the given level
    - name: level
      type: integer
      description: 16-bit; encoded as (dB*10)+8192. Range 7792-8312 (-50 to +12 dB). 0 or < -50 dB effectively mutes.

# --- OPT_END (0xFF): message terminator (no length byte) ---
- id: opt_end
  label: End of Options Marker (OPT_END)
  kind: action
  command: "0xFF"
  notes: Required terminator at end of every message. Does not have a following length byte.
```

## Feedbacks
```yaml
- id: mute_state
  type: enum
  values: [unmuted, muted]
  source: OPT_MUTE reply
- id: power_state
  type: enum
  values: [power_on, standby]
  source: OPT_POWER_STATUS reply
- id: standby_state
  type: enum
  values: [on, standby]
  source: OPT_STANDBY reply
- id: amp_model
  type: integer
  source: OPT_AMP_MODE reply byte aa (1=800,2=1200,3=1800,4=2400,5=3000,6=3800,7=4250,8=8250,9=4070,10=8070)
- id: amp_mode
  type: enum
  values: [stereo, bridged_mono, parallel_mono]
  source: OPT_AMP_MODE reply byte bb
- id: attenuation_db
  type: integer
  unit: dB
  source: OPT_ATTENUATION (0-40 = 0 to -40 dB; 41-255 = off/mute)
- id: input_source
  type: integer
  source: OPT_INPUT_SOURCE byte cc (0=None,1=Analog,2=AES,3=Network,16=AES+Analog Backup,17=CobraNet+Analog Backup,32=Auto)
- id: aes_frequency
  type: integer
  source: OPT_AES_RECEIVER reply (0=44.1k,2=48k,3=32k,4=22k,5=11k,6=24k,7=16k,8=88.2k,9=8k,10=96k,11=64k,12=176.4k,14=192k)
- id: aes_error_code
  type: integer
  source: OPT_AES_RECEIVER reply bytewise (0x01=PARITY,0x02=NON_AUD,0x04=FREQ_CHNG,0x08=INVALID,0x10=UNLOCK,0x20=FREQ_MISMATCH,0x40=NON_PCM,0x80=MCLK_FAIL)
- id: clip_status
  type: enum
  values: [not_clipping, clipping]
  source: OPT_METER_OUTPUT/INPUT reply
- id: output_meter_db
  type: integer
  unit: dB
  source: OPT_METER_OUTPUT (0-40 dB down from clip)
- id: temperature_c
  type: integer
  unit: degC
  source: OPT_METER_TEMP (0-1023 = 0-94 degC linear)
- id: channel_protect
  type: boolean
  source: OPT_CHANNEL_PROTECT (0=Not in protect, !=0=in protect)
- id: device_type
  type: integer
  source: OPT_DEVICE_INFO (0x06=ne24.24M,0x08=Std PE,0x09=DSP PE,0x0B=CobraNet PE,0x0C=WR5,0x0E=NE Rackmount,0x10=NE MultiChannel)
- id: firmware_revision
  type: string
  source: OPT_DEVICE_INFO reply byte bc (e.g. 0x12 = 1.2)
- id: hardware_options
  type: integer
  source: OPT_DEVICE_INFO reply byte dd (bitwise flags per product family)
- id: conductor_status
  type: enum
  values: [not_conductor, conductor]
  source: OPT_COBRANET_STATUS reply
- id: preset_total
  type: integer
  source: OPT_TOTAL_PRESETS byte bb (1-255 = preset count)
- id: preset_sub_supported
  type: boolean
  source: OPT_TOTAL_PRESETS byte aa (0=no,!=0=yes)
```

## Variables
```yaml
# Documented but not enumerated as standalone settings - implemented via OPT_DEVICE_INFO reply.
- id: device_name
  type: string
  description: 20-char ASCII device name (OPT_DEVICE_NAME)
- id: device_group
  type: string
  description: 20-char ASCII device group/folder (OPT_DEVICE_GROUP)
- id: current_preset
  type: integer
  description: Current working preset number (OPT_TOTAL_PRESETS byte cc)
- id: dvca_level
  type: integer
  description: Per-DVCA gain encoded as (dB*10)+8192 (OPT_DVCA_LEVEL)
- id: dvca_link_group
  type: integer
  description: 0=None, 1-8 (OPT_DVCA_LINK_GROUP)
- id: front_panel_atten_db
  type: integer
  unit: dB
  description: 0-40 dB; 41-255 = mute (OPT_METER_ATTENS)
- id: rear_panel_atten_db
  type: integer
  unit: dB
  description: 0-40 dB; 41-255 = mute (OPT_METER_ATTENS)
- id: rtc
  type: object
  description: RTC date/time + DST flag (OPT_RTC)
- id: rd8c_present
  type: boolean
  description: 0=Not Present, !=0=Present (OPT_REMOTE_RD8C byte aa)
```

## Events
```yaml
- id: opt_device_modified
  source: OPT_DEVICE_MODIFIED (0x33)
  description: Device tells PC to re-request all parameters. Length 0 (or 1 with recalled preset number).
- id: dynamic_parameter_updates
  source: Get Parameter reply (header 0x8F), sent by device when parameters change
  description: Updates are sent to subscribed PCs (Request Updates Server, header 0x55). PC's own changes are not echoed to itself.
- id: fault_log_clear_notification
  source: OPT_FAULT_LOG with fault number 0xFFAA received via update
  description: Indicates fault log was cleared (locally or remotely).
- id: set_parameter_ack
  source: Set Parameter reply (header 0xAA) byte 29
  description: |
    Acknowledgment status:
    0 = original message
    1 = received okay
    2 = insufficient security
    3 = insufficient resources (DSP horsepower)
    4 = DSP error (reserved byte 31 = error code)
    5 = already in bulk update mode (OPT_BULK_UPDATE only)
    16 = Save to Temp Buffer (original message, processed)
- id: re_login_request
  source: Request Updates Server to subscribed PCs
  description: When update timeout expires, device sends a message; PC must re-request updates if still alive.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing procedures documented in the Ethernet protocol source. The fault log (OPT_FAULT_LOG) reports protect/thermal/rail faults as events but does not specify user-facing safety procedures.
```

## Notes

Protocol is UDP only — the doc explicitly states "TCP clients will not work. If support for TCP is required, please contact Ashly Audio and describe your needs."

UDP port: **3100** for all three servers (Get Parameter 0x8F, Set Parameter 0xAA, Request Updates 0x55).

Default user name for Set Parameter Server is the literal ASCII string `"default"` (8 bytes, left-justified, null-padded) with no password. Administrative user name is `"admin"` with a password (not stated in source — operator must configure via Ashly System Software).

Set Parameter Server uses a 16-bit circular message counter (bytes 27-28) for ack correlation. Replies echo only header info on success; failures carry a non-zero ack status byte.

Get Parameter Server replies return the current device state with all option values populated; requests may use option length=0 and omit dummy data.

Heartbeat: send a Get Parameter message with no options (only OPT_END) to device on port 3100; it replies with no options.

Dynamic updates: subscribe via Request Updates Server (header 0x55) with a timeout (ms) and a UDP port number to receive updates on. Updates are then pushed using the Get Parameter reply format (header 0x8F) to that port.

dB-to-bytes encoding used throughout (DVCA level, Gain blocks, Mixer Gain, FR fader scaling, meter thresholds): `encoded = round(dB * 10) + 8192` as a 16-bit value. Range -50 to +12 dB maps to 7692-8312.

Set Parameter messages may be broadcast to the UDP port; the destination MAC in the header selects the target device.

CobraNet options (OPT_COBRANET_*), DSP options (OPT_DSP_FUNC_PARAMS, OPT_DSP_FUNC_METERS, OPT_DSP_CHANNEL_METER), DSP sub-functions (FUNC_*), RTC options, AES options, Logic I/O options, FR remote options, and PRESET_SAVE/RECALL are product-specific. The nXe1.54 (per the product page scrape) does not list CobraNet, AES, DSP, RTC, logic I/O, or FR remote features — those options are documented for the broader Ashly NE family and may not be applicable to the nXe1.54 specifically. Verifier should treat them as low-confidence on this model.

The standalone Mixer Mute (0x74) and Mixer Gain (0x75) extension messages were added later and use OPT_DSP_FUNC_PARAMS framing; they require a DSP-equipped NE product.

<!-- UNRESOLVED: power-on sequencing for nXe1.54 not documented in this Ethernet protocol doc. nXe series product page (prior reconnaissance) notes DHCP enabled out of the box and INA-1 RS-232 converter as an option, but INA-1 / WR5 RS-232 protocol is a separate document not included here. -->
```

Spec formatted. Caveat: source covers the broader Ashly NE protocol family — nXe1.54-specific feature applicability not all verifiable from this single doc. Some option-byte typos in source (e.g. OPT_LOGIC_BLOCK byte listed as 0x16, OPT_AMP_GAIN_SETTING as 0x4A, OPT_REMOTE_LEV as 0x50) preserved with notes.

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nXe-amp-2U-datasheet-Mar-2026.pdf
  - https://ashly.com/ethernet-communications/
retrieved_at: 2026-07-14T18:07:37.380Z
last_checked_at: 2026-07-21T20:19:46.577Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:19:46.577Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions, both header framing servers and per-option get/set commands, match the source's option table and byte layouts verbatim; only undocumented OPT_PAD (0xF9) is unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "OPT_PAD (0xF9)"
- "the protocol doc is shared across Ashly NE family; nXe1.54 is a 4-channel 2-rack-unit amplifier without DSP per vendor product page, so DSP-only options (OPT_DSP_FUNC_PARAMS, OPT_DSP_FUNC_METERS, FUNC_*) and CobraNet-only options may not apply. This spec enumerates the full protocol as documented; implementers should verify per-feature applicability on the actual nXe1.54."
- "default admin password not stated in source"
- "no multi-step macro sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing procedures documented in the Ethernet protocol source. The fault log (OPT_FAULT_LOG) reports protect/thermal/rail faults as events but does not specify user-facing safety procedures."
- "power-on sequencing for nXe1.54 not documented in this Ethernet protocol doc. nXe series product page (prior reconnaissance) notes DHCP enabled out of the box and INA-1 RS-232 converter as an option, but INA-1 / WR5 RS-232 protocol is a separate document not included here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
