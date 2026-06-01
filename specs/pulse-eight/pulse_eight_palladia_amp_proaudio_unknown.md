---
spec_id: admin/pulse-eight-proaudio-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Pulse-Eight ProAudio Series Control Spec"
manufacturer: Pulse-Eight
model_family: ProAudio16
aliases: []
compatible_with:
  manufacturers:
    - Pulse-Eight
  models:
    - ProAudio16
    - ProAudio1632
    - ProAudio32
    - ProAudio48
    - ProAudio64
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pulse-eight.com
  - support.pulse-eight.com
source_urls:
  - https://www.pulse-eight.com/Downloads/SerialProtocol_v1-1.pdf
  - https://support.pulse-eight.com/support/solutions/articles/30000048810-neo-xmr-binary-user-manual
  - https://www.pulse-eight.com/Download/GetFile/105
  - https://support.pulse-eight.com/support/solutions/articles/30000053019-neo-matrix-local-webui-guide
retrieved_at: 2026-05-23T20:48:53.689Z
last_checked_at: 2026-05-31T07:05:34.920Z
generated_at: 2026-05-31T07:05:34.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - pAMZ
  - pDMZ
  - pVMZ
  - pDDNDZ
verification:
  verdict: verified
  checked_at: 2026-05-31T07:05:34.920Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions have literal wire-token matches in the source; transport (port 50005, 19200 8N1) confirmed; 4 paging-mute commands in source are not represented in spec but do not exceed the 5-command short threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# Pulse-Eight ProAudio Series Control Spec

## Summary
Multi-zone audio matrix switchers supporting analog (RCA) and digital (coax/optical) audio routing. Controlled via RS-232 serial or raw TCP/IP socket sharing the same ASCII command protocol (`^CMD params$`). Supports up to 128 zones depending on model, with per-zone volume, bass/treble, 5-band EQ, balance, lip-sync delay, and paging/doorbell functionality.

<!-- UNRESOLVED: exact Palladia model names not stated in source; source references ProAudio line -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: flow_control setting not explicitly stated (omitted from serial port settings list) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50005
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # P command: power on/off/lock
  - routable     # SZ, DSZ: route sources to zones
  - queryable    # ? parameter on most commands
  - levelable    # VZ, VPZ, MV, BAZ, TRZ, EQ, GAZ, GAI, BLZ
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "^P 1$"
    description: Turn on power
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "^P 0$"
    description: Turn off power if not locked
    params: []

  - id: power_off_forced
    label: Power Off Forced
    kind: action
    command: "^P 2$"
    description: Turn off power regardless of lock state
    params: []

  - id: power_on_locked
    label: Power On Locked
    kind: action
    command: "^P 3$"
    description: Turn on power and lock on; only P 2 can turn off
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "^P +$"
    description: Toggle power state
    params: []

  - id: set_zone_source
    label: Set Zone Source (Analog)
    kind: action
    command: "^SZ @{zone},{source}$"
    description: Map a source to analog zone(s)
    params:
      - name: zone
        type: string
        description: "Zone number(s), e.g. 1 or 1:8 for range or 1@3@5 for multiple"
      - name: source
        type: integer
        description: "Source number (0=disconnect, 1-32=analog RCA, 33-64=coax PCM, 65-80=optical PCM in extended I/O mode)"

  - id: set_zone_source_seq_fwd
    label: Sequence Zone Source Forward (Analog)
    kind: action
    command: "^SZ @{zone},+$"
    description: Sequence zones forward through sources
    params:
      - name: zone
        type: string
        description: Zone number(s)

  - id: set_zone_source_seq_rev
    label: Sequence Zone Source Reverse (Analog)
    kind: action
    command: "^SZ @{zone},-$"
    description: Sequence zones in reverse through sources
    params:
      - name: zone
        type: string
        description: Zone number(s)

  - id: set_digital_zone_source
    label: Set Zone Source (Digital)
    kind: action
    command: "^DSZ @{zone},{source}$"
    description: Map a source to digital zone(s)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: source
        type: integer
        description: "Digital source number"

  - id: mute_zone
    label: Mute Zone (Analog)
    kind: action
    command: "^MZ @{zone},{mute}$"
    description: Hard mute/disconnect analog zone; remembers source
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: mute
        type: integer
        description: "0=Unmuted, 1=Muted"

  - id: mute_zone_toggle
    label: Mute Zone Toggle (Analog)
    kind: action
    command: "^MZ @{zone},+$"
    description: Toggle mute on analog zone(s)
    params:
      - name: zone
        type: string
        description: Zone number(s)

  - id: power_zone
    label: Power Zone On/Off
    kind: action
    command: "^PZ @{zone},{pwr}$"
    description: Power on/off an analog zone; may affect 12V triggers
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: pwr
        type: integer
        description: "0=Off, 1=On"

  - id: mute_digital_zone
    label: Mute Zone (Digital)
    kind: action
    command: "^DMZ @{zone},{mute}$"
    description: Mute/disconnect digital zone
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: mute
        type: integer
        description: "0=Unmuted, 1=Muted"

  - id: set_zone_switching_delay
    label: Set Zone Switching Delay (Analog)
    kind: action
    command: "^DZ @{zone},{delay}$"
    description: Set mute-before-switch delay in milliseconds
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: delay
        type: integer
        description: Delay in milliseconds

  - id: set_digital_zone_switching_delay
    label: Set Zone Switching Delay (Digital)
    kind: action
    command: "^DDZ @{zone},{delay}$"
    description: Set mute-before-switch delay for digital zones in ms
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: delay
        type: integer
        description: Delay in milliseconds

  - id: set_volume_zone
    label: Set Zone Volume (dB)
    kind: action
    command: "^VZ @{zone},{vol}$"
    description: Set zone volume in 0.5dB steps offset 200 (200=0dB, 0=mute, 248=+24dB)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: vol
        type: integer
        description: "Volume 0-248, 0=mute, 200=0dB"

  - id: set_volume_zone_pct
    label: Set Zone Volume (Percent)
    kind: action
    command: "^VPZ @{zone},{vol}$"
    description: Set zone volume as percentage 0-100
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: vol
        type: integer
        description: "0=mute, 100=max"

  - id: volume_zone_up
    label: Volume Up (dB steps)
    kind: action
    command: "^VZ @{zone},+{step}$"
    description: Increase zone volume by step count (0.5dB per step)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: step
        type: integer
        description: Number of 0.5dB steps

  - id: volume_zone_down
    label: Volume Down (dB steps)
    kind: action
    command: "^VZ @{zone},-{step}$"
    description: Decrease zone volume by step count (0.5dB per step)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: step
        type: integer
        description: Number of 0.5dB steps

  - id: volume_zone_pct_up
    label: Volume Up (Percent)
    kind: action
    command: "^VPZ @{zone},+{step}$"
    description: Increase zone volume by step count (0.5dB per step)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: step
        type: integer
        description: Number of 0.5dB steps

  - id: volume_zone_pct_down
    label: Volume Down (Percent)
    kind: action
    command: "^VPZ @{zone},-{step}$"
    description: Decrease zone volume by step count (0.5dB per step)
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: step
        type: integer
        description: Number of 0.5dB steps

  - id: set_master_volume
    label: Set Master Volume
    kind: action
    command: "^MV {vol}$"
    description: Set overall volume; 200=0dB, 0=mute, 248=+24dB
    params:
      - name: vol
        type: integer
        description: "0-248, 0=mute, 200=0dB"

  - id: set_zone_min_volume
    label: Set Zone Minimum Volume
    kind: action
    command: "^VMIZ @{zone},{minVol}$"
    description: Set minimum volume limit per zone in 0.5dB steps offset 200
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: minVol
        type: integer
        description: "0 to maxVol-99"

  - id: set_zone_max_volume
    label: Set Zone Maximum Volume
    kind: action
    command: "^VMAZ @{zone},{maxVol}$"
    description: Set maximum volume limit per zone in 0.5dB steps offset 200
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: maxVol
        type: integer
        description: "minVol+99 to 248"

  - id: mute_volume_zone
    label: Volume Mute Zone
    kind: action
    command: "^VMZ @{zone},{mute}$"
    description: "Audio mute via volume processor; 0=Unmute, 1=Mute, 2=NoMute, +=Toggle"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: mute
        type: string
        description: "0, 1, 2, or +"

  - id: set_zone_balance
    label: Set Zone Balance
    kind: action
    command: "^BLZ @{zone},{bal}$"
    description: "Set balance; 0=full left, 200=center, 400=full right"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: bal
        type: integer
        description: "0-400, 200=center"

  - id: set_zone_gain
    label: Set Zone Gain
    kind: action
    command: "^GAZ @{zone},{gain}$"
    description: "Set zone output gain; 152=-24dB, 200=0dB, 248=+24dB"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: gain
        type: integer
        description: "152-248, 200=0dB"

  - id: set_source_gain
    label: Set Source Gain (Input Trim)
    kind: action
    command: "^GAI @{source},{gain}$"
    description: "Set source input gain; 152=-24dB, 200=0dB, 248=+24dB"
    params:
      - name: source
        type: string
        description: Source number(s)
      - name: gain
        type: integer
        description: "152-248, 200=0dB"

  - id: set_zone_bass
    label: Set Zone Bass
    kind: action
    command: "^BAZ @{zone},{level}$"
    description: "Set bass; 88=-20dB, 128=0dB, 168=+20dB"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: level
        type: integer
        description: "88-168, 128=flat"

  - id: set_zone_treble
    label: Set Zone Treble
    kind: action
    command: "^TRZ @{zone},{level}$"
    description: "Set treble; 88=-20dB, 128=0dB, 168=+20dB"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: level
        type: integer
        description: "88-168, 128=flat"

  - id: set_zone_eq_band
    label: Set Zone EQ Band
    kind: action
    command: "^{band} @{zone},{level}$"
    description: "Set 5-band EQ level per zone; bands EQ1Z(100Hz) EQ2Z(330Hz) EQ3Z(1kHz) EQ4Z(3.3kHz) EQ5Z(10kHz)"
    params:
      - name: band
        type: string
        description: "EQ1Z through EQ5Z"
      - name: zone
        type: string
        description: Zone number(s)
      - name: level
        type: integer
        description: "88-168, 128=flat"

  - id: set_zone_filter_type
    label: Set Zone Filter Type
    kind: action
    command: "^FTYPZ @{zone},{type}$"
    description: "Enable low/high pass filter; 0=off, 2=LPF 12dB, 3=HPF 12dB, 4=LPF 24dB, 5=HPF 24dB"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: type
        type: integer
        description: "0-5"

  - id: set_zone_crossover_freq
    label: Set Zone Crossover Frequency
    kind: action
    command: "^FFRQZ @{zone},{freq}$"
    description: "Set crossover freq; 0=off, 1=50Hz through 32=300Hz"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: freq
        type: integer
        description: "0-32"

  - id: set_zone_stereo_mix
    label: Set Zone Stereo Mix
    kind: action
    command: "^MXZ @{zone},{mix}$"
    description: "Set stereo down-mix; 0=none, 1=swap, 2=sum, 3=left, 4=right, 5=L-R, 6=R-L"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: mix
        type: integer
        description: "0-6"

  - id: set_source_stereo_mix
    label: Set Source Stereo Mix
    kind: action
    command: "^MXI @{source},{mix}$"
    description: "Set input stereo down-mix; values same as MXZ"
    params:
      - name: source
        type: string
        description: Source number(s)
      - name: mix
        type: integer
        description: "0-6"

  - id: set_digital_routing
    label: Set Digital Audio Routing
    kind: action
    command: "^DRZ @{zone},{routing}$"
    description: "0=independent digital zone (via DSZ), 1=mirror associated analog zone"
    params:
      - name: zone
        type: string
        description: Coax zone number(s)
      - name: routing
        type: integer
        description: "0 or 1"

  - id: set_zone_lipsync
    label: Set Zone Lip Sync Delay
    kind: action
    command: "^LSZ @{zone},{delay}$"
    description: "Set lip sync delay in 48KHz samples (48 counts/ms, max 8191=170.65ms)"
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: delay
        type: integer
        description: "0-8191"

  - id: set_source_lipsync
    label: Set Source Lip Sync Delay
    kind: action
    command: "^LSI @{source},{delay}$"
    description: "Set source lip sync delay in 48KHz samples"
    params:
      - name: source
        type: string
        description: Source number(s)
      - name: delay
        type: integer
        description: "0-8191"

  - id: lock_zone
    label: Lock Zone to Another Zone
    kind: action
    command: "^LZ @{zone},{zoneToFollow}$"
    description: Lock zone(s) to follow another zone's source/volume/tone
    params:
      - name: zone
        type: string
        description: Zone(s) to lock
      - name: zoneToFollow
        type: integer
        description: Zone to follow

  - id: set_control_settings
    label: Set Control Settings
    kind: action
    command: "^XS {settings1},{settings2}$"
    description: "Bitmapped control flags: ACK, ECO, CRE, ASY, XIO, MJP, UVL"
    params:
      - name: settings1
        type: integer
        description: Bitmapped settings word 1
      - name: settings2
        type: integer
        description: Bitmapped settings word 2

  - id: save_settings
    label: Save Settings to EEPROM
    kind: action
    command: "^SS {settings}$"
    description: "Save selected settings to EEPROM as power-on defaults (bitmapped)"
    params:
      - name: settings
        type: integer
        description: Bitmapped selection of which settings to save

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "^FS {settings}$"
    description: "Reset selected parameters to factory defaults (bitmapped)"
    params:
      - name: settings
        type: integer
        description: Bitmapped selection of which settings to reset

  - id: set_lighting
    label: Set Front Panel Lighting
    kind: action
    command: "^LI {mode},{dim},{bright},{off}$"
    description: "Set LED mode and intensities; mode 0=off, 1=dim, 2=bright, 3=auto-dim"
    params:
      - name: mode
        type: integer
        description: "0-3"
      - name: dim
        type: integer
        description: "0-100 percent"
      - name: bright
        type: integer
        description: "0-100 percent"
      - name: off
        type: integer
        description: "0-100 percent"

  - id: set_ip_mode
    label: Set IP Mode
    kind: action
    command: "^IPSET {mode}$"
    description: "0=Static, 1=DHCP"
    params:
      - name: mode
        type: integer
        description: "0 or 1"

  - id: set_static_ip
    label: Set Static IP Address
    kind: action
    command: "^IPA {xxx},{xxx},{xxx},{xxx}$"
    description: Set the static IP address (applied on next IPSET 0)
    params:
      - name: xxx
        type: integer
        description: Octet value

  - id: set_static_mask
    label: Set Static IP Mask
    kind: action
    command: "^IPM {xxx},{xxx},{xxx},{xxx}$"
    description: Set the static subnet mask (applied on next IPSET 0)
    params:
      - name: xxx
        type: integer
        description: Octet value

  - id: set_static_gateway
    label: Set Static IP Gateway
    kind: action
    command: "^IPG {xxx},{xxx},{xxx},{xxx}$"
    description: Set the static gateway address (applied on next IPSET 0)
    params:
      - name: xxx
        type: integer
        description: Octet value

  - id: set_12v_trigger
    label: Set 12V Trigger
    kind: action
    command: "^STRG @{trg},{setting}$"
    description: "0=Off, 1=On, 2=Follow zone power"
    params:
      - name: trg
        type: string
        description: Trigger number(s)
      - name: setting
        type: integer
        description: "0-2"

  - id: set_trigger_zone
    label: Associate Zone with 12V Trigger
    kind: action
    command: "^TRGZ @{zone},{trg}$"
    description: Associate zone(s) with a 12V trigger for power-follow behavior
    params:
      - name: zone
        type: string
        description: Zone number(s)
      - name: trg
        type: integer
        description: 12V trigger number

  - id: page_set_source_analog
    label: Set Page Source (Analog)
    kind: action
    command: "^pASZ {preset},@{zone},{source}$"
    description: Preset the analog source a zone switches to during a page
    params:
      - name: preset
        type: integer
        description: "Preset number >0"
      - name: zone
        type: string
        description: Zone number
      - name: source
        type: integer
        description: Source number

  - id: page_set_source_digital
    label: Set Page Source (Digital)
    kind: action
    command: "^pDSZ {preset},@{zone},{source}$"
    description: Preset the digital source a zone switches to during a page
    params:
      - name: preset
        type: integer
        description: "Preset number >0"
      - name: zone
        type: string
        description: Zone number
      - name: source
        type: integer
        description: Source number

  - id: page_set_volume
    label: Set Page Volume (dB)
    kind: action
    command: "^pVZ {preset},@{zone},{vol_db}$"
    description: Set paging volume for a zone in dB (absolute or relative with +/- prefix)
    params:
      - name: preset
        type: integer
        description: "Preset number >0"
      - name: zone
        type: string
        description: Zone number
      - name: vol_db
        type: string
        description: "Absolute or +/- relative volume"

  - id: page_set_volume_pct
    label: Set Page Volume (Percent)
    kind: action
    command: "^pVPZ {preset},@{zone},{vol_pct}$"
    description: Set paging volume for a zone as percentage
    params:
      - name: preset
        type: integer
        description: "Preset number >0"
      - name: zone
        type: string
        description: Zone number
      - name: vol_pct
        type: string
        description: "0-100, or +/- relative"

  - id: page_set_dnd
    label: Set Do Not Disturb (Analog)
    kind: action
    command: "^pADNDZ {preset},{flag}$"
    description: "0=Allow paging, 1=Do Not Disturb, 2=Allow but do not change source"
    params:
      - name: preset
        type: integer
        description: "Preset number >0"
      - name: flag
        type: integer
        description: "0-2"

  - id: page_set_switch
    label: Set Page Back Panel Switch
    kind: action
    command: "^pDSW {switch},{action},{preset},{time}$"
    description: Configure back panel dry contact/voltage trigger for paging
    params:
      - name: switch
        type: integer
        description: "1 or 2"
      - name: action
        type: integer
        description: "0=disable, 1=active on, 2=active off, 3=timed on, 4=timed off"
      - name: preset
        type: integer
        description: Preset number
      - name: time
        type: integer
        description: Duration in ms for timed modes

  - id: page_set_time
    label: Set Page Timing
    kind: action
    command: "^pTIME {preset},{init_dly},{min_time}$"
    description: Set initial delay and minimum page duration in milliseconds
    params:
      - name: preset
        type: integer
        description: Preset number
      - name: init_dly
        type: integer
        description: Initial delay in ms
      - name: min_time
        type: integer
        description: Minimum page time in ms

  - id: page_start
    label: Start or Stop Page
    kind: action
    command: "^pSET {preset},{time}$"
    description: "0=Stop page, 1-2=Start page with given preset; time in ms or 0 for manual stop"
    params:
      - name: preset
        type: integer
        description: "0=stop, 1 or 2=start"
      - name: time
        type: integer
        description: "Duration in ms, 0=wait for pSET 0"

  - id: enable_extended_io
    label: Enable Extended I/O Mode
    kind: action
    command: "^XS +32768$"
    description: Set XIO bit for universal source numbering across models
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    command: "^P ?$"
    response: "^=P {n}$"
    values: ["0", "1", "3"]
    description: "0=Off, 1=On, 3=Locked On"

  - id: zone_source
    type: string
    command: "^SZ @{zone}?$"
    response: "^=SZ @{zone},{source}$"
    description: Current source mapped to each analog zone (3-digit fixed width)

  - id: digital_zone_source
    type: string
    command: "^DSZ @{zone}?$"
    response: "^=DSZ @{zone},{source}$"
    description: Current source mapped to each digital zone (3-digit fixed width)

  - id: zone_mute_state
    type: enum
    command: "^MZ @{zone}?$"
    response: "^=MZ @{zone},{mute}$"
    values: ["0", "1"]
    description: "0=Unmuted, 1=Muted"

  - id: zone_power_state
    type: enum
    command: "^PZ @{zone}?$"
    response: "^=PZ @{zone},{pwr}$"
    values: ["0", "1"]
    description: "0=Off, 1=On"

  - id: digital_zone_mute_state
    type: enum
    command: "^DMZ @{zone}?$"
    response: "^=DMZ @{zone},{mute}$"
    values: ["0", "1"]
    description: "0=Unmuted, 1=Muted"

  - id: zone_volume
    type: integer
    command: "^VZ @{zone}?$"
    response: "^=VZ @{zone},{vol}$"
    description: "Volume 0-248"

  - id: zone_volume_pct
    type: integer
    command: "^VPZ @{zone}?$"
    response: "^=VPZ @{zone},{vol}$"
    description: "Volume 0-100"

  - id: zone_min_volume
    type: integer
    command: "^VMIZ @{zone}?$"
    response: "^=VMIZ @{zone},{minVol}$"
    description: Minimum volume setting

  - id: zone_max_volume
    type: integer
    command: "^VMAZ @{zone}?$"
    response: "^=VMAZ @{zone},{maxVol}$"
    description: Maximum volume setting

  - id: zone_volume_mute
    type: enum
    command: "^VMZ @{zone}?$"
    response: "^=VMZ @{zone},{mute}$"
    values: ["0", "1"]
    description: "0=Unmuted, 1=Muted"

  - id: zone_balance
    type: integer
    command: "^BLZ @{zone}?$"
    response: "^=BLZ @{zone},{bal}$"
    description: "0-400, 200=center"

  - id: zone_gain
    type: integer
    command: "^GAZ @{zone}?$"
    response: "^=GAZ @{zone},{gain}$"
    description: "152-248"

  - id: source_gain
    type: integer
    command: "^GAI @{source}?$"
    response: "^=GAI @{source},{gain}$"
    description: "152-248"

  - id: zone_bass
    type: integer
    command: "^BAZ @{zone}?$"
    response: "^=BAZ @{zone},{level}$"
    description: "88-168, 128=flat"

  - id: zone_treble
    type: integer
    command: "^TRZ @{zone}?$"
    response: "^=TRZ @{zone},{level}$"
    description: "88-168, 128=flat"

  - id: zone_eq_band
    type: integer
    command: "^{band} @{zone}?$"
    response: "^={band} @{zone},{level}$"
    description: "EQ1Z-EQ5Z level, 88-168"

  - id: zone_filter_type
    type: integer
    command: "^FTYPZ @{zone}?$"
    response: "^=FTYPZ @{zone},{type}$"
    description: "0-5"

  - id: zone_crossover_freq
    type: integer
    command: "^FFRQZ @{zone}?$"
    response: "^=FFRQZ @{zone},{freq}$"
    description: "0-32"

  - id: zone_stereo_mix
    type: integer
    command: "^MXZ @{zone}?$"
    response: "^=MXZ @{zone},{mix}$"
    description: "0-6"

  - id: zone_digital_routing
    type: integer
    command: "^DRZ @{zone}?$"
    response: "^=DRZ @{zone},{routing}$"
    description: "0 or 1"

  - id: zone_lipsync
    type: integer
    command: "^LSZ @{zone}?$"
    response: "^=LSZ @{zone},{delay}$"
    description: "0-8191"

  - id: source_lipsync
    type: integer
    command: "^LSI @{source}?$"
    response: "^=LSI @{source},{delay}$"
    description: "0-8191"

  - id: zone_audio_type
    type: enum
    command: "^ATZ @{zone}?$"
    response: "^=ATZ @{zone},{audio_type}$"
    values: ["0", "1", "2", "3"]
    description: "0=Analog/transitioning, 1=No SPDIF, 2=PCM stereo, 3=Encoded (Dolby/DTS)"

  - id: firmware_version
    type: string
    command: "^V ?$"
    response: '^=V "{model}",{fw},{serial}$'
    description: Returns model name, firmware version, and serial number

  - id: control_settings
    type: string
    command: "^XS ?$"
    response: "^=XS {s1},{s2}$"
    description: Current XS control settings bitmaps

  - id: zone_switching_delay
    type: integer
    command: "^DZ @{zone}?$"
    response: "^=DZ @{zone},{delay}$"
    description: Analog zone switching delay in ms

  - id: lighting
    type: string
    command: "^LI ?$"
    response: "^=LI {mode},{dim},{bright},{off}$"
    description: Front panel lighting mode and intensities

  - id: ip_mode
    type: enum
    command: "^IPSET ?$"
    response: "^=IPSET {mode}$"
    values: ["0", "1"]
    description: "0=Static, 1=DHCP"

  - id: static_ip_address
    type: string
    command: "^IPA ?$"
    response: "^=IPA {xxx},{xxx},{xxx},{xxx}$"
    description: Configured static IP (not necessarily active)

  - id: current_ip_address
    type: string
    command: "^IPAX ?$"
    response: "^=IPAX {xxx},{xxx},{xxx},{xxx}$"
    description: Currently active IP address

  - id: current_ip_mask
    type: string
    command: "^IPMX ?$"
    response: "^=IPMX {xxx},{xxx},{xxx},{xxx}$"
    description: Currently active IP mask

  - id: current_ip_gateway
    type: string
    command: "^IPGX ?$"
    response: "^=IPGX {xxx},{xxx},{xxx},{xxx}$"
    description: Currently active gateway address

  - id: trigger_state
    type: integer
    command: "^STRG @{trg}?$"
    response: "^=STRG @{trg},{setting}$"
    description: "0=Off, 1=On, 2=Zone-controlled"

  - id: error_response
    type: enum
    values: ["1", "2", "3", "5", "6", "7", "8"]
    description: "Error codes: 1=Unrecognized cmd, 2=Param out of range, 3=Syntax error, 5=Param count, 6=Busy, 7=Buffer overflow, 8=Power required"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond those captured as actions/feedbacks
```

## Events
```yaml
events:
  - id: async_parameter_change
    description: "When XS ASY bit=1, response strings are sent automatically on any parameter change"
    response_format: "^={CMD} {params}$"

  - id: audio_type_change
    description: "ATZ response sent automatically when a zone's audio source type changes"
    response_format: "^=ATZ @{zone},{audio_type}$"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly defined in source beyond paging presets
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Command format is `^CMD params$` — all commands start with `^` and end with `$`. Characters outside these delimiters are ignored.
- Spaces between command and params are optional. CR/LF are ignored inside the frame.
- Response strings use fixed-width parameters with leading zeros for easier parsing (e.g. `@001,003`).
- Acknowledgement `^+$` sent for every error-free command (can be disabled via XS ACK bit).
- Error response format: `^!<error_number>$`.
- Query parameter `?` returns current value(s) for most commands.
- Zone ranges use `:` separator (e.g. `@1:8`), multiple zones can be comma-separated or concatenated (e.g. `@1@3@5`).
- Zones prefixed with `@`, sources are plain numbers.
- Extended I/O mode (`^XS +32768$`) provides universal source numbering across all ProAudio models.
- Paging has a hard 2-minute timeout limit.
- TCP connection auto-closes after 10 minutes of failed communication retries.
- Volume uses 0.5dB steps with offset 200 (200=0dB, 0=mute/-115dB, 248=+24dB).
- Bass/Treble/EQ use 0.5dB steps with offset 128 (128=0dB, range 88-168 = +/-20dB).
- Balance uses offset 200 (200=center, 0=full left, 400=full right).

<!-- UNRESOLVED: flow_control not stated for RS-232 -->
<!-- UNRESOLVED: Palladia model names/numbers not documented in this source -->
<!-- UNRESOLVED: maximum number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: VMLZ and VMT commands referenced (mute level, fade time) but not documented in this source excerpt -->

## Provenance

```yaml
source_domains:
  - pulse-eight.com
  - support.pulse-eight.com
source_urls:
  - https://www.pulse-eight.com/Downloads/SerialProtocol_v1-1.pdf
  - https://support.pulse-eight.com/support/solutions/articles/30000048810-neo-xmr-binary-user-manual
  - https://www.pulse-eight.com/Download/GetFile/105
  - https://support.pulse-eight.com/support/solutions/articles/30000053019-neo-matrix-local-webui-guide
retrieved_at: 2026-05-23T20:48:53.689Z
last_checked_at: 2026-05-31T07:05:34.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:05:34.920Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions have literal wire-token matches in the source; transport (port 50005, 19200 8N1) confirmed; 4 paging-mute commands in source are not represented in spec but do not exceed the 5-command short threshold."
```

## Known Gaps

```yaml
- pAMZ
- pDMZ
- pVMZ
- pDDNDZ
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
