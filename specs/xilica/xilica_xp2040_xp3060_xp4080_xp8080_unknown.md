---
spec_id: admin/xilica-xp2040-xp3060-xp4080-xp8080
schema_version: ai4av-public-spec-v1
revision: 1
title: "Xilica XP Series Control Spec"
manufacturer: Xilica
model_family: XP2040
aliases: []
compatible_with:
  manufacturers:
    - Xilica
  models:
    - XP2040
    - XP3060
    - XP4080
    - XP8080
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - cn.xilica.com
  - la-bs.com
source_urls:
  - https://web.archive.org/web/20190713025353/http://xilica.com/wp-content/uploads/2013/06/Xilica-XConsole_communication_protocol-manual.pdf
  - https://cn.xilica.com/wp-content/uploads/2022/01/210630054214_XIL003_UserManual_XP.pdf
  - https://www.la-bs.com/Objets/XP3060_me.pdf
  - https://web.archive.org/web/20181228194537/http://xilica.com/products/xp/
  - "https://web.archive.org/web/2018*/xilica.com/products/xp/"
retrieved_at: 2026-06-12T20:32:59.374Z
last_checked_at: 2026-06-14T16:16:25.648Z
generated_at: 2026-06-14T16:16:25.648Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP control documented for XP series; the Third-party-Control-Manual covers Neutrino/Uno only"
  - "no power on/off command in source"
  - "exact response byte format for each query not fully documented in source"
  - "source does not define persistent variable storage separate from actions"
  - "source does not document unsolicited notification events"
  - "source describes Program Download/Upload multi-step procedures but"
  - "no safety warnings or interlock procedures documented in source"
  - "no TCP/IP or Ethernet control protocol documented despite %EN0 (Ethernet Info) query existing"
  - "no power on/off command; device presumably powered via front panel only"
  - "exact data byte encoding for DLY3 (delay) — source shows 3-byte data header (<12>?) but this is unclear"
  - "MTR0 meter response format not specified"
verification:
  verdict: verified
  checked_at: 2026-06-14T16:16:25.648Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions match source commands literally; all transport parameters supported; complete command coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Xilica XP Series Control Spec

## Summary
Xilica XP series DSP processors (XP2040, XP3060, XP4080, XP8080) controlled via RS-232 serial using the XConsole binary communication protocol (April 2008). The protocol uses SOH/STX-framed ASCII-hex packets with a modulo-96 checksum and supports read/write operations for audio processing parameters including EQ, dynamics, routing, and system configuration.

<!-- UNRESOLVED: no TCP/IP control documented for XP series; the Third-party-Control-Manual covers Neutrino/Uno only -->
<!-- UNRESOLVED: no power on/off command in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable    # inferred: LVL0, MIC0, EQL0, EQL1, gain/level commands present
- queryable    # inferred: Read ('R') operations return parameter values; MTR0 meter query
- routable     # inferred: MIX0 mixer command routes inputs to outputs
```

## Actions
```yaml
# Protocol frame structure (common to all commands):
#   <01><W/R><SENDER><03><CMD_4BYTES><08>{device}<09>{io}<0A>{channel}<0B>{aux}<HEADER>{data}<1F><CHECKSUM><02>
# <01> = SOH, <02> = STX (frame delimiters)
# W/R = <57>/<52> (Write/Read)
# <SENDER> = <7F> normally
# <03> = command header (4-byte command ID follows)
# <08> = device header, <09> = I/O header, <0A> = channel header, <0B> = aux header
# <10>-<18> = data headers (1-9 bytes)
# <1F> = process byte (triggers execution)
# Checksum: sum all bytes SOH..before checksum, mod 0x60, + 0x20
# Device/I/O/Channel/Aux values are zero-based (<20> = 0, <21> = 1, etc.)

- id: meter
  label: Meter
  kind: query
  command: "<03><4D><54><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based, <20>=0...<2F>=15)"
    - name: io
      type: integer
      description: "0=<20> for Input, 1=<21> for Output"
    - name: channel
      type: integer
      description: "Channel number (0-based, <20>=0...<27>=7)"

- id: mute_set
  label: Mute Set
  kind: action
  command: "<03><4D><55><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: mute_on
      type: integer
      description: "0=OFF (<20>), 1=ON (<21>)"

- id: mute_query
  label: Mute Query
  kind: query
  command: "<03><4D><55><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: mix_gain_set
  label: Mix Gain Set
  kind: action
  command: "<03><4D><49><43><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: gain
      type: integer
      description: "0-15 (0dB to 45dB, 3dB steps)"

- id: mix_gain_query
  label: Mix Gain Query
  kind: query
  command: "<03><4D><49><43><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: signal_level_set
  label: Signal Level Set
  kind: action
  command: "<03><4C><56><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: level
      type: integer
      description: "0-220 (-40dB to +15dB, 0.25dB steps)"

- id: signal_level_query
  label: Signal Level Query
  kind: query
  command: "<03><4C><56><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: signal_polarity_set
  label: Signal Polarity Set
  kind: action
  command: "<03><50><4F><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: polarity
      type: integer
      description: "0=+ (<20>), 1=- (<21>)"

- id: signal_polarity_query
  label: Signal Polarity Query
  kind: query
  command: "<03><50><4F><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: signal_delay_set
  label: Signal Delay Set
  kind: action
  command: "<03><44><4C><59><33>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: delay
      type: integer
      description: "0-62400 (0ms to 650ms, 1/96ms steps)"

- id: signal_delay_query
  label: Signal Delay Query
  kind: query
  command: "<03><44><4C><59><33>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: eq_type_set
  label: EQ Type Set
  kind: action
  command: "<03><45><51><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"
    - name: eq_type
      type: integer
      description: "0=PEQ, 1=LO-SH, 2=HI-SH, 3=AP-1, 4=AP-2"

- id: eq_type_query
  label: EQ Type Query
  kind: query
  command: "<03><45><51><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"

- id: eq_frequency_set
  label: EQ Frequency Set
  kind: action
  command: "<03><45><51><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"
    - name: frequency
      type: integer
      description: "0-29980 (20Hz to 30000Hz, 1Hz steps)"

- id: eq_frequency_query
  label: EQ Frequency Query
  kind: query
  command: "<03><45><51><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"

- id: eq_bandwidth_set
  label: EQ Bandwidth Set
  kind: action
  command: "<03><45><51><42><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"
    - name: bandwidth
      type: integer
      description: "0-359 (0.02oct to 3.61oct, 0.01oct steps)"

- id: eq_bandwidth_query
  label: EQ Bandwidth Query
  kind: query
  command: "<03><45><51><42><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"

- id: eq_level_set
  label: EQ Level Set
  kind: action
  command: "<03><45><51><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"
    - name: level
      type: integer
      description: "0-180 (-30dB to +15dB, 0.25dB steps)"

- id: eq_level_query
  label: EQ Level Query
  kind: query
  command: "<03><45><51><4C><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"

- id: eq_bypass_set
  label: EQ Bypass Set
  kind: action
  command: "<03><45><51><62><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"
    - name: bypass
      type: integer
      description: "0=OFF (<20>), 1=ON (<21>)"

- id: eq_bypass_query
  label: EQ Bypass Query
  kind: query
  command: "<03><45><51><62><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "EQ number (0-based)"

- id: geq_level_set
  label: GEQ Level Set
  kind: action
  command: "<03><45><51><4C><31>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "GEQ band number (0-based)"
    - name: level
      type: integer
      description: "0-180 (-30dB to +15dB, 0.25dB steps)"

- id: geq_level_query
  label: GEQ Level Query
  kind: query
  command: "<03><45><51><4C><31>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "GEQ band number (0-based)"

- id: geq_bypass_set
  label: GEQ Bypass Set
  kind: action
  command: "<03><45><51><62><31>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "GEQ band number (0-based)"
    - name: bypass
      type: integer
      description: "0=OFF (<20>), 1=ON (<21>)"

- id: geq_bypass_query
  label: GEQ Bypass Query
  kind: query
  command: "<03><45><51><62><31>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "GEQ band number (0-based)"

- id: crossover_type_set
  label: Crossover Type Set
  kind: action
  command: "<03><58><52><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: xover_type
      type: integer
      description: "0=OFF, 1=BUTWRTH, 2=LINK-RI, 3=BESSEL"

- id: crossover_type_query
  label: Crossover Type Query
  kind: query
  command: "<03><58><52><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: crossover_frequency_set
  label: Crossover Frequency Set
  kind: action
  command: "<03><58><52><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: frequency
      type: integer
      description: "0-29980 (20Hz to 30000Hz, 1Hz steps)"

- id: crossover_frequency_query
  label: Crossover Frequency Query
  kind: query
  command: "<03><58><52><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: crossover_slope_set
  label: Crossover Slope Set
  kind: action
  command: "<03><58><52><53><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: slope
      type: integer
      description: "0-7 (6dB to 48dB, 6dB steps)"

- id: crossover_slope_query
  label: Crossover Slope Query
  kind: query
  command: "<03><58><52><53><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: fir_type_set
  label: FIR Type Set
  kind: action
  command: "<03><58><46><45><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: fir_type
      type: integer
      description: "0=OFF, 1=FIR"

- id: fir_type_query
  label: FIR Type Query
  kind: query
  command: "<03><58><46><45><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: fir_frequency_set
  label: FIR Frequency Set
  kind: action
  command: "<03><58><46><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: frequency
      type: integer
      description: "0-29980 (20Hz to 30000Hz, 1Hz steps)"

- id: fir_frequency_query
  label: FIR Frequency Query
  kind: query
  command: "<03><58><46><46><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: compressor_threshold_set
  label: Compressor Threshold Set
  kind: action
  command: "<03><43><4D><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: threshold
      type: integer
      description: "0-80 (-20dBu to +20dBu, 0.5dBu steps)"

- id: compressor_threshold_query
  label: Compressor Threshold Query
  kind: query
  command: "<03><43><4D><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: compressor_attack_set
  label: Compressor Attack Set
  kind: action
  command: "<03><43><4D><41><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: attack
      type: integer
      description: "0-106 (0.3ms to 100ms, 0.1ms/1ms steps)"

- id: compressor_attack_query
  label: Compressor Attack Query
  kind: query
  command: "<03><43><4D><41><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: compressor_release_set
  label: Compressor Release Set
  kind: action
  command: "<03><43><4D><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: release
      type: integer
      description: "0-4 (2x/4x/8x/16x/32x)"

- id: compressor_release_query
  label: Compressor Release Query
  kind: query
  command: "<03><43><4D><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: compressor_ratio_set
  label: Compressor Ratio Set
  kind: action
  command: "<03><43><4D><58><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: ratio
      type: integer
      description: "0-39 (ratio 1 to 40, step 1)"

- id: compressor_ratio_query
  label: Compressor Ratio Query
  kind: query
  command: "<03><43><4D><58><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: limiter_threshold_set
  label: Limiter Threshold Set
  kind: action
  command: "<03><4C><4D><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: threshold
      type: integer
      description: "0-80 (-20dBu to +20dBu, 0.5dBu steps)"

- id: limiter_threshold_query
  label: Limiter Threshold Query
  kind: query
  command: "<03><4C><4D><54><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: limiter_attack_set
  label: Limiter Attack Set
  kind: action
  command: "<03><4C><4D><41><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: attack
      type: integer
      description: "0-106 (0.3ms to 100ms, 0.1ms/1ms steps)"

- id: limiter_attack_query
  label: Limiter Attack Query
  kind: query
  command: "<03><4C><4D><41><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: limiter_release_set
  label: Limiter Release Set
  kind: action
  command: "<03><4C><4D><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: release
      type: integer
      description: "0-4 (2x/4x/8x/16x/32x)"

- id: limiter_release_query
  label: Limiter Release Query
  kind: query
  command: "<03><4C><4D><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: mixer_set
  label: Mixer Set
  kind: action
  command: "<03><4D><49><58><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: mix_level
      type: integer
      description: "0-161 (OFF to 0.0dB, 0.25dB steps)"

- id: mixer_query
  label: Mixer Query
  kind: query
  command: "<03><4D><49><58><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: channel_name_set
  label: Channel Name Set
  kind: action
  command: "<03><43><48><4E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: aux
      type: integer
      description: "Character index (0-based)"
    - name: char_code
      type: integer
      description: "Character code per source code map (0-84)"

- id: channel_name_query
  label: Channel Name Query
  kind: query
  command: "<03><43><48><4E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"

- id: level_increment
  label: Level Increment
  kind: action
  command: "<03><23><4C><56><4C>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: steps
      type: integer
      description: "Number of 0.25dB steps to increment"
  notes: "Column value = <21> (1) for increment"

- id: level_decrement
  label: Level Decrement
  kind: action
  command: "<03><23><4C><56><4C>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: io
      type: integer
      description: "0=Input, 1=Output"
    - name: channel
      type: integer
      description: "Channel number (0-based)"
    - name: steps
      type: integer
      description: "Number of 0.25dB steps to decrement"
  notes: "Column value = <20> (0) for decrement"

- id: down_sync
  label: Down Sync
  kind: action
  command: "<03><25><53><44><30>"
  params:
    - name: data
      type: integer
      description: "<21>=ON (start sync), <20>=OFF (end sync)"

- id: up_sync
  label: Up Sync
  kind: action
  command: "<03><25><53><55><30>"
  params: []

- id: lock_password_set
  label: Lock Password Set
  kind: action
  command: "<03><25><4C><50><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: char_index
      type: integer
      description: "Aux value = character position (0-based)"
    - name: char_code
      type: integer
      description: "Character code per source code map"
  notes: "Each character sent individually with Aux header; see Password procedure in source"

- id: lock_key_set
  label: Lock Key Set
  kind: action
  command: "<03><25><4C><4B><30>"
  params:
    - name: data
      type: integer
      description: "Lock/unlock value (source does not enumerate values)"

- id: channel_in_number_query
  label: Channel In Number Query
  kind: query
  command: "<03><25><6E><49><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: channel_out_number_query
  label: Channel Out Number Query
  kind: query
  command: "<03><25><6E><4F><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: company_query
  label: Company Query
  kind: query
  command: "<03><25><4E><43><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: sampling_frequency_query
  label: Sampling Frequency Query
  kind: query
  command: "<03><25><6E><53><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: product_name_query
  label: Product Name Query
  kind: query
  command: "<03><25><4E><50><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: version_query
  label: Version Query
  kind: query
  command: "<03><25><4E><56><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: device_name_set
  label: Device Name Set
  kind: action
  command: "<03><25><4E><44><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: char_index
      type: integer
      description: "Aux value = character position (0-based)"
    - name: char_code
      type: integer
      description: "Character code per source code map"

- id: device_name_query
  label: Device Name Query
  kind: query
  command: "<03><25><4E><44><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: device_number_query
  label: Device Number Query
  kind: query
  command: "<03><25><6E><44><30>"
  params: []

- id: program_number_query
  label: Program Number Query
  kind: query
  command: "<03><25><50><6E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: program_name_set
  label: Program Name Set
  kind: action
  command: "<03><25><50><4E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: char_index
      type: integer
      description: "Aux value = character position (0-based)"
    - name: char_code
      type: integer
      description: "Character code per source code map"

- id: program_name_query
  label: Program Name Query
  kind: query
  command: "<03><25><50><4E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: program_recall
  label: Program Recall
  kind: action
  command: "<03><25><50><52><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: program
      type: integer
      description: "Program number (0-based, 0-29)"

- id: program_store
  label: Program Store
  kind: action
  command: "<03><25><50><53><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
    - name: program
      type: integer
      description: "Program number (0-based, 0-29)"

- id: program_download
  label: Program Download
  kind: action
  command: "<03><25><50><44><30>"
  params:
    - name: data
      type: integer
      description: "<21>=ON (start download), <20>=OFF (end download)"
  notes: "Advanced procedure: send parameters for each program then store. See Program Download procedure in source."

- id: program_upload
  label: Program Upload
  kind: action
  command: "<03><25><50><55><30>"
  params:
    - name: data
      type: integer
      description: "<21>=ON (start upload), <20>=OFF (end upload)"
  notes: "Advanced procedure: recall each program then upsync. See Program Upload procedure in source."

- id: reset
  label: Reset
  kind: action
  command: "<03><25><52><53><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: ethernet_info_query
  label: Ethernet Info Query
  kind: query
  command: "<03><25><45><4E><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"

- id: xpanel_info_query
  label: XPanel Info Query
  kind: query
  command: "<03><25><58><50><30>"
  params:
    - name: device
      type: integer
      description: "Device number (0-based)"
```

## Feedbacks
```yaml
# Device echoes received commands back as acknowledgement.
# Read ('R') operations return current parameter values in the same frame format.
# Downsync OFF (%SD0 data=<20>) echoed as acknowledgement.
# Program Store (%PS0) echoed with same data as acknowledgement.
# Meter (MTR0) response returns signal level data.
# UNRESOLVED: exact response byte format for each query not fully documented in source
```

## Variables
```yaml
# UNRESOLVED: source does not define persistent variable storage separate from actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification events
```

## Macros
```yaml
# UNRESOLVED: source describes Program Download/Upload multi-step procedures but
# these are host-driven sequences, not device-side macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes
- All values use zero-based indexing: Device 1 in the system menu = Device 0 (<20>) in the protocol. Channel 1 = <20>, Aux 1 = <20>.
- Data values > 96 decimal must be encoded in base-96, with each digit offset by <20> (+0x20) to keep bytes in the printable ASCII range (<20>-<7F>).
- Multiple `<HEADER><VALUE>` pairs can be packed in a single frame before `<PROCESS>` (<1F>). Total frame must be < 256 bytes.
- `<PROCESS>` (<1F>) can appear multiple times per frame to batch operations (e.g. mute multiple channels).
- The device number in the system menu is 1-based; protocol Device# is 0-based.
- Character code map for string parameters (password, device name, program name, channel name): `_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz-<>?,./~!@#$%^&*()=+';` (index 0 = '_', index 84 = ';').
- The source document is the XConsole Communication Protocol dated April 2008. The XP series is legacy; current Xilica products use the Solaro line with a different protocol.
<!-- UNRESOLVED: no TCP/IP or Ethernet control protocol documented despite %EN0 (Ethernet Info) query existing -->
<!-- UNRESOLVED: no power on/off command; device presumably powered via front panel only -->
<!-- UNRESOLVED: exact data byte encoding for DLY3 (delay) — source shows 3-byte data header (<12>?) but this is unclear -->
<!-- UNRESOLVED: MTR0 meter response format not specified -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - cn.xilica.com
  - la-bs.com
source_urls:
  - https://web.archive.org/web/20190713025353/http://xilica.com/wp-content/uploads/2013/06/Xilica-XConsole_communication_protocol-manual.pdf
  - https://cn.xilica.com/wp-content/uploads/2022/01/210630054214_XIL003_UserManual_XP.pdf
  - https://www.la-bs.com/Objets/XP3060_me.pdf
  - https://web.archive.org/web/20181228194537/http://xilica.com/products/xp/
  - "https://web.archive.org/web/2018*/xilica.com/products/xp/"
retrieved_at: 2026-06-12T20:32:59.374Z
last_checked_at: 2026-06-14T16:16:25.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:16:25.648Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions match source commands literally; all transport parameters supported; complete command coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP control documented for XP series; the Third-party-Control-Manual covers Neutrino/Uno only"
- "no power on/off command in source"
- "exact response byte format for each query not fully documented in source"
- "source does not define persistent variable storage separate from actions"
- "source does not document unsolicited notification events"
- "source describes Program Download/Upload multi-step procedures but"
- "no safety warnings or interlock procedures documented in source"
- "no TCP/IP or Ethernet control protocol documented despite %EN0 (Ethernet Info) query existing"
- "no power on/off command; device presumably powered via front panel only"
- "exact data byte encoding for DLY3 (delay) — source shows 3-byte data header (<12>?) but this is unclear"
- "MTR0 meter response format not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
